'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.car, {
        foreignKey: 'createdBy'
      });

      this.hasMany(models.car, {
        foreignKey: 'updatedBy'
      });

      this.hasMany(models.car, {
        foreignKey: 'deletedBy'
      });
    }
  }
  user.init({
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email is requred"
        },
        notEmpty: {
          msg: "email cant be empty"
        },
        isEmail: {
          msg: "email must be in correct format"
        }
      }
    },
    encryptedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "encrypted password is required"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phone number is required"
        },
        notEmpty: {
          msg: "phone number cant be empty"
        }
      }
    },
    addres: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "addres is required"
        },
        notEmpty: {
          msg: "addres cant be empty"
        }
      }
    },
    role: {
      type: DataTypes.ENUM("superadmin", "admin", "member"),
      validate: {
        isIn: {
          args: [["superadmin", "admin", "member"]],
          msg: "user role must be either superadmin, admin, or member"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};