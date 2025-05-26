const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./config/db");
const Contacto = require("./models/Contacto");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Verificar conexión a la base de datos
(async () => {
    try {
        await sequelize.authenticate(); // Verifica conexión
        console.log("✅ DB is connect");

        await sequelize.sync(); // Crea tablas si no existen
        console.log("📦 Tablas sincronizadas correctamente");
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error);
    }
})();

// Ruta para guardar contacto
app.post("/api/contacto" /*API produccion: " " */, async (req, res) => {
    console.log("📨 Datos recibidos desde el formulario:", req.body);
    try {
        const existe = await Contacto.findOne({
            where: { codEstudiante: req.body.codEstudiante },
        });

        if (existe) {
            return res
                .status(409)
                .json({ message: "Este estudiante ya está registrado." });
        }

        const nuevoContacto = await Contacto.create(req.body);
        res.status(200).json({
            message: "Formulario guardado correctamente",
            data: nuevoContacto,
        });
    } catch (err) {
        console.error("❌ Error al guardar datos:", err);
        res.status(500).json({ message: "Error al guardar datos" });
    }
});

// Iniciar servidor
app.listen(5000, () => {
    console.log("🚀 Servidor backend corriendo en http://localhost:5000");
});