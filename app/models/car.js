'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'createdBy',
        as: 'created'
      });

      this.belongsTo(models.user, {
        foreignKey: 'updatedBy',
        as: 'updated'
      });

      this.belongsTo(models.user, {
        foreignKey: 'deletedBy',
        as: 'deleted'
      });
    }
  }
  car.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name is required"
        },
        notEmpty: {
          msg: "name cant be empty"
        },
      }
    },
    type: {
      type: DataTypes.ENUM("small", "medium", "large"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "car type is required"
        },
        isIn: {
          args: [["small", "medium", "large"]],
          msg: "car type must be either small, medium, or large"
        }
      }
    },
    image: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "image is required"
        }
      }
    },
    capacity: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "capacity is required"
        },
        isNumeric: {
          msg: "capacity can be only numbers"
        }
      }
    },
    rentPerDay: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "rent per day is required"
        },
        isNumeric: {
          msg: "rent per day can be only numbers"
        }
      }
    },
    description: { 
      type: DataTypes.STRING
    },
    availableAt: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "available date is required"
        },
        isDate: {
          msg: "available at must be in date"
        }
      }
    }
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'car',
  });
  return car;
};