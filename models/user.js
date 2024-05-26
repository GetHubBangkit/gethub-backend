'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      User.belongsTo(models.Role, { foreignKey: 'role_id' });
      User.hasOne(models.EmailVerification, { foreignKey: 'user_id' });
    }
  };

  User.init({
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    web: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true
    },
    qr_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_verify: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    is_complete_profile: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_premium: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'Role', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    theme_hub: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sentiment_owner_analisis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sentiment_owner_score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    sentiment_freelance_analisis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sentiment_freelance_score: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  return User;
};
