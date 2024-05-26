"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
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
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
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
        defaultValue: false,
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
        references: { model: "Role", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    },
    {
      modelName: "User",
      tableName: "users",
      validUpdateColumns() {
        const allowedColumns = ["full_name", "profession", "phone", "web", "address", "photo", "about", "theme_hub", "sentiment_owner_analisis", "sentiment_owner_score", "sentiment_freelance_analisis", "sentiment_freelance_score"];
        for (const key in this._changed) {
          if (!allowedColumns.includes(key)) {
            throw new Error(`Kolom ${key} tidak dapat diperbarui`);
          }
        }
      }
    }
  );
  User.associate = function (models) {
    // Asosiasi dengan model Role
    User.belongsTo(models.Role, { foreignKey: "role_id" });
    // Asosiasi dengan model EmailVerification
    User.hasOne(models.EmailVerification, { foreignKey: "user_id" });
  };
  return User;
};
