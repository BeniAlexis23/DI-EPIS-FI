const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Deportes = sequelize.define(
    "Deportes",
    {
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ciclo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombreEquipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deporte: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        titulares: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        suplentes: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["nombreEquipo", "deporte"],
            },
        ],
    }
);

module.exports = Deportes;
