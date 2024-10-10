'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrivateKey = sequelize.define('PrivateKey', {
    privateKey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Addresses',
        key: 'id'
      }
    },
    seedPhraseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'SeedPhrases',
        key: 'id'
      }
    },
  }, {});

  PrivateKey.associate = function(models) {
    PrivateKey.belongsTo(models.Address, {
      foreignKey: 'addressId',
      as: 'addresses',
      onDelete: 'CASCADE'
    });

    PrivateKey.belongsTo(models.SeedPhrase, {
      foreignKey: 'seedPhraseId',
      as: 'seedPhrases',
      onDelete: 'CASCADE'
    });
  };

  return PrivateKey;
};
