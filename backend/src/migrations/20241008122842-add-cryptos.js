'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cryptos', [
      {
        name: 'bitcoin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ethereum',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ripple',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'stellar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'tron',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cryptos', null, {});
  }
};
