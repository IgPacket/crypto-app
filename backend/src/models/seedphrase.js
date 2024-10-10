'use strict';
module.exports = (sequelize, DataTypes) => {
  const SeedPhrase = sequelize.define('SeedPhrase', {
    phrase: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {});

  SeedPhrase.associate = function(models) {
    SeedPhrase.hasMany(models.PrivateKey, {
      foreignKey: 'seedPhraseId',
      as: 'privateKeys',
      onDelete: 'CASCADE'
    });
  };

  return SeedPhrase;
};
