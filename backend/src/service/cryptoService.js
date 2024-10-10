const { Crypto, Address, PrivateKey, SeedPhrase } = require('../models');
const { convertToFiat } = require('../util/conversion');
const { FIAT_CURRENCY } = require('../util/config');
const { generateAddressFromPrivateKey, generatePrivateKeyFromSeedPhrase } = require('../util/keyGeneration');
const { getBalanceFromAddress } = require('../util/getBalance')

module.exports = {
    async addPrivateKey(currency, privateKey) {
        try {
            const crypto = await Crypto.findOne({where: {name: currency}});
            if (!crypto) {
                throw new Error('Currency not found');
            }
            const address = await generateAddressFromPrivateKey(privateKey, currency);

            const addressEntry = await Address.create({
                address: address,
                CryptoId: crypto.id,
            });

            const privateKeyEntry = await PrivateKey.create({
                privateKey: privateKey,
                addressId: addressEntry.id,
                seedPhraseId: null,
            });

            return address;
        } catch (error) {
            throw new Error('Error add private key: ' + error);
        }
    },

    async addSeedPhrase(currency, phrase) {
        try {
            const crypto = await Crypto.findOne({where: {name: currency}});
            if (!crypto) {
                throw new Error('Currency not found');
            }
            const privateKey = await generatePrivateKeyFromSeedPhrase(phrase, currency);

            const seedPhraseInDB = await SeedPhrase.findOne({where: {phrase: phrase}});

            const seedPhraseEntry = seedPhraseInDB ? seedPhraseInDB : await SeedPhrase.create({
                phrase: phrase,
            });

            const address = await generateAddressFromPrivateKey(privateKey, currency);

            const addressEntry = await Address.create({
                address: address,
                CryptoId: crypto.id,
            });

            const privateKeyEntry = await PrivateKey.create({
                privateKey: privateKey,
                seedPhraseId: seedPhraseEntry.id,
                addressId: addressEntry.id,
            });

            return address;
        } catch (error) {
            throw new Error('Error add seed-phrase: ' + error);
        }
    },

    async getBalance(currency, address) {
        try {
            const balance = await getBalanceFromAddress(address, currency);
            const balanceToUsd = await this.convertBalanceToUSD(balance, currency)
            return { balance, balanceToUsd }
        } catch (error) {
            throw new Error('Failed to fetch balance ' + error);
        }
    },

    async convertBalanceToUSD(balance, currency) {
        return await convertToFiat(balance, currency, FIAT_CURRENCY);
    },

    async getAddressesByCurrency(currency) {
        try {
            const crypto = await Crypto.findOne({
                where: {name: currency},
                include: [{model: Address, as: 'addresses'}]
            });

            if (!crypto) {
                throw new Error('Crypto not found')
            }

            return crypto.dataValues.addresses.map(dataVal => {
                return dataVal.address
            });
        } catch (error) {
            throw new Error('Error get addresses by currency: ' + error);
        }
    },

    async getAllAddresses() {
        try {
            const cryptos = await Crypto.findAll({
                include: [{model: Address, as: 'addresses'}]
            });
            if (!cryptos) {
                throw new Error('Crypto not found')
            }

            return cryptos.map(currency => {
                const addresses = currency.dataValues.addresses.map(dataVal => {
                    return dataVal.address
                })
                return { currency: currency.name, addresses: addresses }
            });
        } catch (error) {
            throw new Error('Error get all addresses: ' + error);
        }
    },

    async deleteAddress(address) {
        try {
            const addressToDelete = await Address.findOne({where: {address: address}});
            if (!addressToDelete) {
                throw new Error('Address not found');
            }
            await addressToDelete.destroy();

            return { message: 'Address successfully deleted' };
        } catch (error) {
            throw new Error('Error delete address: ' + error);
        }
    }

};
