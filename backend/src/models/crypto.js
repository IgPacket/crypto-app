'use strict';
module.exports = (sequelize, DataTypes) => {
  const Crypto = sequelize.define('Crypto', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});

  Crypto.associate = function(models) {
    Crypto.hasMany(models.Address, {
      foreignKey: 'CryptoId',
      as: 'addresses',
      onDelete: 'CASCADE'
    });
  };

  return Crypto;
};
