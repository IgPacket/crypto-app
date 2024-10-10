const bitcoin= require('bitcoinjs-lib');
const bip39 = require('bip39');
const ethWallet = require('ethereumjs-wallet').default;
const StellarSdk = require('stellar-sdk');
const {TronWeb} = require('tronweb');
const { ethers } = require('ethers');
const rippleKeypairs = require('ripple-keypairs');
const { mnemonicToSeed } = require("bip39");
let tronAddressFromSeed = null;

/*
1 - bitcoin
2 - ethereum
3 - ripple
4 - stellar
5 - tron
 */

async function generatePrivateKeyFromSeedPhrase(seedPhrase, currency) {
    switch (currency) {
        case 'bitcoin': return await generateBitcoinPrivateKeyFromSeedPhrase(seedPhrase);
        case 'ethereum': return await generateEthereumPrivateKeyFromSeedPhrase(seedPhrase);
        case 'ripple': return await generateRipplePrivateKeyFromSeedPhrase(seedPhrase);
        case 'stellar': return await generateStellarPrivateKeyFromSeedPhrase(seedPhrase);
        case 'tron': return await generateTronPrivateKeyFromSeedPhrase(seedPhrase);
        default:
            throw new Error('Unsupported currency');
    }
}

async function generateAddressFromPrivateKey(seedPhrase, currency) {
    switch (currency) {
        case 'bitcoin': return await generateBitcoinAddressFromPrivateKey(seedPhrase);
        case 'ethereum': return await generateEthereumAddressFromPrivateKey(seedPhrase);
        case 'ripple': return await generateRippleAddressFromPrivateKey(seedPhrase);
        case 'stellar': return await generateStellarAddressFromPrivateKey(seedPhrase);
        case 'tron': return await generateTronAddressFromPrivateKey(seedPhrase);
        default:
            throw new Error('Unsupported currency');
    }
}

// Генерация приватного ключа и адреса для Bitcoin
async function generateBitcoinPrivateKeyFromSeedPhrase(seedPhrase) {
    try {
        const seed = await bip39.mnemonicToSeedSync(seedPhrase);
        const root = bitcoin.bip32.fromSeed(seed);
        const child = root.derivePath("m/44'/0'/0'/0/0");
        return child.privateKey.toString('hex');
    } catch (error) {
        throw new Error('Error generating Bitcoin private key: ' + error);
    }
}

async function generateBitcoinAddressFromPrivateKey(privateKey) {
    try {
        const keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
        if (!address) {
            throw new Error('Failed to generate address.');
        }
        return address;
    } catch (error) {
        throw new Error('Error generating Bitcoin address: ' + error);
    }
}

async function generateEthereumPrivateKeyFromSeedPhrase(seedPhrase) {
    try {
        const seed = await mnemonicToSeed(seedPhrase);
        const hd = ethers.HDNodeWallet.fromSeed(seed)
        return hd.privateKey;
    } catch (error) {
        throw new Error('Error generating Ethereum private key: ' + error);
    }
}

async function generateEthereumAddressFromPrivateKey(privateKey) {
    try {
        const slicedPrivateKey = privateKey.slice(0, 2) == '0x' ? privateKey.slice(2) : privateKey;
        const wallet = ethWallet.fromPrivateKey(Buffer.from(slicedPrivateKey, 'hex'));
        return wallet.getAddressString();
    } catch (error) {
        throw new Error('Error generating Ethereum address: ' + error);
    }
}

async function generateRipplePrivateKeyFromSeedPhrase(seedPhrase) {
    try {
        const seed = rippleKeypairs.generateSeed(seedPhrase);
        const keypair = rippleKeypairs.deriveKeypair(seed);
        return keypair.privateKey;
    } catch (error) {
        throw new Error('Error generating Ripple private key: ' + error);
    }
}

async function generateRippleAddressFromPrivateKey(privateKey) {
    try {
        const seed = rippleKeypairs.generateSeed(privateKey);
        const keypair = rippleKeypairs.deriveKeypair(seed);
        return rippleKeypairs.deriveAddress(keypair.publicKey);
    } catch (error) {
        throw new Error('Error generating Ripple address: ' + error);
    }
}

async function generateStellarPrivateKeyFromSeedPhrase(seedPhrase) {
    try {
        const seed = bip39.mnemonicToSeedSync(seedPhrase);
        const keyPair = StellarSdk.Keypair.fromRawEd25519Seed(seed.slice(0, 32));
        return keyPair.secret();
    } catch (error) {
        throw new Error('Error generating Stellar private key: ' + error);
    }
}

async function generateStellarAddressFromPrivateKey(privateKey) {
    try {
        const keyPair = StellarSdk.Keypair.fromSecret(privateKey);
        return keyPair.publicKey();
    } catch (error) {
        throw new Error('Error generating Stellar address: ' + error);
    }
}

async function generateTronPrivateKeyFromSeedPhrase(seedPhrase) {
    try {
        const tronWeb = new TronWeb({
            fullHost: 'https://api.trongrid.io',
        });
        const account = tronWeb.utils.accounts.generateAccountWithMnemonic(seedPhrase);
        tronAddressFromSeed = account.address
        return account.privateKey;
    } catch (error) {
        throw new Error('Error generating Tron private key: ' + error);
    }
}

async function generateTronAddressFromPrivateKey(privateKey) {
    try {
        if (tronAddressFromSeed != null) {
            const address = tronAddressFromSeed
            tronAddressFromSeed = null;
            return address
        }
        const tronWeb = new TronWeb({
            fullHost: 'https://api.trongrid.io',
            privateKey: privateKey
        });
        return tronWeb.address.fromHex(privateKey);
    } catch (error) {
        throw new Error('Error generating Tron address: ' + error);
    }
}

module.exports = {
    generatePrivateKeyFromSeedPhrase,
    generateAddressFromPrivateKey
};