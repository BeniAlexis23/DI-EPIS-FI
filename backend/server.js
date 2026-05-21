require('dotenv').config(); // ← debe ir antes que cualquier uso de process.env

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./config/db");
const Contacto = require("./models/Contacto");


const CICLOS_PERMITIDOS = new Set(["I", "III", "V", "VII", "IX", "X"]);

const sanitizeContacto = (body) => ({
    codEstudiante: String(body.codEstudiante || "").trim(),
    name: String(body.name || "").trim(),
    lastnamePaterno: String(body.lastnamePaterno || "").trim(),
    lastnameMaterno: String(body.lastnameMaterno || "").trim(),
    phone: String(body.phone || "").trim(),
    email: String(body.email || "").trim().toLowerCase(),
    ciclo: String(body.ciclo || "").trim(),
    message: String(body.message || "").trim(),
});

const validarContacto = (data) => {
    const camposRequeridos = [
        ["codEstudiante", "Código de estudiante"],
        ["name", "Nombres completos"],
        ["lastnamePaterno", "Apellido paterno"],
        ["lastnameMaterno", "Apellido materno"],
        ["phone", "Celular"],
        ["email", "Correo institucional"],
        ["ciclo", "Ciclo académico"],
        ["message", "Expectativa del evento"],
    ];

    const incompletos = camposRequeridos
        .filter(([campo]) => !data[campo])
        .map(([, etiqueta]) => etiqueta);

    if (incompletos.length > 0) {
        return `Completa todos los campos requeridos: ${incompletos.join(", ")}.`;
    }

    if (!/^\d{10}$/.test(data.codEstudiante)) {
        return "El código de estudiante debe tener exactamente 10 dígitos.";
    }

    if (!/^\d{9}$/.test(data.phone)) {
        return "El número de celular debe tener exactamente 9 dígitos.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return "Ingresa un correo válido.";
    }

    if (!CICLOS_PERMITIDOS.has(data.ciclo)) {
        return "Selecciona un ciclo académico válido.";
    }

    return null;
};
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Verificar conexión a la base de datos
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ DB is connected");

        await sequelize.sync(); // Crea tablas si no existen
        console.log("📦 Tablas sincronizadas correctamente");
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error);
    }
})();

// Ruta para guardar contacto
app.post("/api/contacto", async (req, res) => {
    const datosContacto = sanitizeContacto(req.body);
    console.log("📨 Datos recibidos desde el formulario:", datosContacto);

    const validationError = validarContacto(datosContacto);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const existe = await Contacto.findOne({
            where: { codEstudiante: datosContacto.codEstudiante },
        });

        if (existe) {
            return res.status(409).json({
                message: "Este estudiante ya está registrado.",
            });
        }

        const nuevoContacto = await Contacto.create(datosContacto);
        res.status(200).json({
            message: "Formulario guardado correctamente",
            data: nuevoContacto,
        });
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                message: "Este estudiante ya está registrado.",
            });
        }

        console.error("❌ Error al guardar datos:", err);
        res.status(500).json({ message: "Error al guardar datos" });
    }
});

// Servir frontend (React build) como archivos estáticos
//app.use(express.static(path.join(__dirname, "frontend/build")));

//app.get("*", (req, res) => {
//    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
//});

// Iniciar servidor en el puerto definido o por defecto 5000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});

