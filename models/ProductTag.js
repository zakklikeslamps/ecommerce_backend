//import necessary parts of sequelize lib.
const { Model, DataTypes } = require('sequelize');

//import db connection from connection.js
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  // define columns est. fields/rules for Product Tags Model

  {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id",

      }
    
    },

    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      }

    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
