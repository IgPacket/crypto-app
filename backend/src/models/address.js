'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    CryptoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Crypto',
        key: 'id'
      }
    }
  }, {});

  Address.associate = function(models) {
    Address.belongsTo(models.Crypto, {
      foreignKey: 'CryptoId',
      as: 'cryptos'
    });
  };

  return Address;
};
