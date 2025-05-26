const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contacto = sequelize.define("Contacto", {
    codEstudiante: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // ← evita duplicados a nivel de BD
    },
    name: { type: DataTypes.STRING, allowNull: false },
    lastnamePaterno: { type: DataTypes.STRING, allowNull: false },
    lastnameMaterno: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    ciclo: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
});


module.exports = Contacto;