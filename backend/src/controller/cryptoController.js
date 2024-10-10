const cryptoService = require('../service/cryptoService');

module.exports = {
    async addPrivateKey(ctx) {
        const { currency, privateKey } = ctx.request.body;

        try {
            const address = await cryptoService.addPrivateKey(currency, privateKey);
            ctx.body = { message: 'Private key added, address generated', address };
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to add private key or generate address ' };
        }
    },

    async addSeedPhrase(ctx) {
        const { currency, seedPhrase } = ctx.request.body;

        try {
            const address = await cryptoService.addSeedPhrase(currency, seedPhrase);
            ctx.body = { message: 'Seed phrase added, private key and address generated', address };
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to add seed phrase or generate private key and address ' };
        }
    },

    async getBalance(ctx) {
        const { currency, address } = ctx.params;
        try {
            const { balance, balanceToUsd } = await cryptoService.getBalance(currency, address);
            ctx.body = { balance, balanceToUsd };
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to fetch balance ' };
        }
    },

    async convertBalanceToUSD(ctx) {
        const { currency, balance } = ctx.request.body;
        try {
            const balanceInUSD = await cryptoService.convertBalanceToUSD(balance, currency);
            ctx.body = { balance, balanceInUSD };
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to convert balance to USD' };
        }
    },

    async getAddressesByCurrency(ctx) {
        const { currency } = ctx.params;
        try {
            ctx.body = await cryptoService.getAddressesByCurrency(currency);
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to fetch addresses' };
        }
    },

    async getAllAddresses(ctx) {
        try {
            ctx.body = await cryptoService.getAllAddresses();
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to fetch addresses ' };
        }
    },

    async deleteAddress(ctx) {
        const { address } = ctx.params
        try {
            ctx.body = await cryptoService.deleteAddress(address)
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Failed to delete address ' }
        }
    }
};
