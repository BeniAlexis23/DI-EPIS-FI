require('dotenv').config(); // ← debe ir antes que cualquier uso de process.env

const express = require("express");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./config/db");
const Contacto = require("./models/Contacto");
const Deportes = require("./models/Deportes");
const { sanitizeDeportes, validarDeportes } = require("./utils/deportesValidation");


const CLASIFICACION_MAX_LENGTH = 120;

const isPublicoGeneral = (ciclo) => {
    const value = String(ciclo || "").trim().toLowerCase();
    return value === "general" || value === "público general" || value === "publico general";
};

const buildCodigoPublicoGeneral = (email) => {
    const hash = crypto.createHash("sha256").update(email.toLowerCase()).digest("hex");
    return `PG${hash.slice(0, 8)}`.toUpperCase();
};

const prepareContacto = (data) => {
    if (isPublicoGeneral(data.ciclo) && !data.codEstudiante) {
        return { ...data, codEstudiante: buildCodigoPublicoGeneral(data.email) };
    }
    return data;
};

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
        ["name", "Nombres completos"],
        ["lastnamePaterno", "Apellido paterno"],
        ["lastnameMaterno", "Apellido materno"],
        ["phone", "Celular"],
        ["email", "Correo institucional"],
        ["ciclo", "Clasificación"],
        ["message", "Expectativa del evento"],
    ];

    if (!isPublicoGeneral(data.ciclo)) {
        camposRequeridos.unshift(["codEstudiante", "Código de postulante"]);
    }

    const incompletos = camposRequeridos
        .filter(([campo]) => !data[campo])
        .map(([, etiqueta]) => etiqueta);

    if (incompletos.length > 0) {
        return `Completa todos los campos requeridos: ${incompletos.join(", ")}.`;
    }

    if (!isPublicoGeneral(data.ciclo) && !/^\d{10}$/.test(data.codEstudiante)) {
        return "El código de postulante debe tener exactamente 10 dígitos.";
    }

    if (!/^\d{9}$/.test(data.phone)) {
        return "El número de celular debe tener exactamente 9 dígitos.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return "Ingresa un correo válido.";
    }

    if (data.ciclo.length > CLASIFICACION_MAX_LENGTH) {
        return `La clasificación no puede exceder ${CLASIFICACION_MAX_LENGTH} caracteres.`;
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
    const datosContacto = prepareContacto(sanitizeContacto(req.body));
    console.log("📨 Datos recibidos desde el formulario:", datosContacto);

    const validationError = validarContacto(datosContacto);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const existe = isPublicoGeneral(datosContacto.ciclo)
            ? await Contacto.findOne({ where: { email: datosContacto.email } })
            : await Contacto.findOne({
                  where: { codEstudiante: datosContacto.codEstudiante },
              });

        if (existe) {
            return res.status(409).json({
                message: isPublicoGeneral(datosContacto.ciclo)
                    ? "Este correo ya está registrado."
                    : "Este estudiante ya está registrado.",
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

// Ruta para registro deportivo de equipos
app.post("/api/deportes", async (req, res) => {
    const datosDeportes = sanitizeDeportes(req.body);
    console.log("📨 Datos recibidos desde registro deportivo:", datosDeportes);

    const validationError = validarDeportes(datosDeportes);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const existe = await Deportes.findOne({
            where: {
                nombreEquipo: datosDeportes.nombreEquipo,
                deporte: datosDeportes.deporte,
            },
        });

        if (existe) {
            return res.status(409).json({
                message: "Ya existe un equipo con ese nombre registrado en esta modalidad.",
            });
        }

        const nuevoRegistro = await Deportes.create({
            tipo: datosDeportes.tipo,
            ciclo: datosDeportes.ciclo,
            nombreEquipo: datosDeportes.nombreEquipo,
            deporte: datosDeportes.deporte,
            phone: datosDeportes.phone,
            titulares: datosDeportes.titulares,
            suplentes: datosDeportes.suplentes,
        });

        res.status(200).json({
            message: "Equipo registrado correctamente",
            data: nuevoRegistro,
        });
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                message: "Ya existe un equipo con ese nombre registrado en esta modalidad.",
            });
        }

        console.error("❌ Error al guardar registro deportivo:", err);
        res.status(500).json({ message: "Error al guardar el registro deportivo" });
    }
});

// Servir frontend (React build) como archivos estáticos
//app.use(express.static(path.join(__dirname, "frontend/build")));

//app.get("*", (req, res) => {
//    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
//});

const getNetworkAddresses = () => {
    try {
        const interfaces = os.networkInterfaces();
        const addresses = [];

        for (const [name, nets] of Object.entries(interfaces)) {
            for (const net of nets) {
                const isIPv4 = net.family === "IPv4" || net.family === 4;
                if (isIPv4 && !net.internal) {
                    addresses.push({ name, address: net.address });
                }
            }
        }

        return addresses;
    } catch (error) {
        console.warn("⚠️ No se pudieron leer las interfaces de red:", error.message);
        return [];
    }
};

const logServerStartup = (port) => {
    console.log("────────────────────────────────────────");
    console.log(`🚀 Servidor backend en puerto ${port}`);
    console.log(`   Local:    http://localhost:${port}`);
    console.log(`   Red (0):  http://0.0.0.0:${port}`);

    const networkAddresses = getNetworkAddresses();

    if (networkAddresses.length > 0) {
        console.log("   Red local (usa estas IPs para conectarte):");
        networkAddresses.forEach(({ name, address }) => {
            console.log(`   • http://${address}:${port}  (${name})`);
        });
    } else {
        console.log("   Red local: no se detectaron IPs externas (solo localhost)");
    }

    console.log("────────────────────────────────────────");
};

// Iniciar servidor en el puerto definido o por defecto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    logServerStartup(PORT);
});

