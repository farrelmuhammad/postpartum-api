'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptoms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Symptoms.init({
    symptom_name: DataTypes.STRING,
    mb_symptom: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Symptoms',
  });
  return Symptoms;
};