const DEPORTES_PERMITIDOS = new Set(["Fútbol", "Vóley", "Básquet"]);
const TIPOS_PERMITIDOS = new Set(["Estudiante", "Administrativo/Egresado"]);
const CICLOS_ESTUDIANTE = new Set(["I", "II", "III", "V", "VII", "IX"]);

const SPORT_RULES = {
    "Fútbol": { titulares: 7, suplentes: 3 },
    "Vóley": { titulares: 6, suplentes: 6 },
    "Básquet": { titulares: 5, suplentes: 3 },
};

const getSportRules = (deporte) => SPORT_RULES[deporte] || null;

const sanitizeDeportes = (body) => {
    const deporte = String(body.deporte || "").trim();
    const rules = getSportRules(deporte);
    const totalSlots = rules ? rules.titulares + rules.suplentes : 0;

    const rawPlayers = Array.isArray(body.jugadores)
        ? body.jugadores
        : [...(Array.isArray(body.titulares) ? body.titulares : []), ...(Array.isArray(body.suplentes) ? body.suplentes : [])];

    const jugadores = Array.from({ length: totalSlots }, (_, index) =>
        String(rawPlayers[index] || "").trim()
    );

    const titulares = rules ? jugadores.slice(0, rules.titulares) : [];
    const suplentes = rules ? jugadores.slice(rules.titulares).filter(Boolean) : [];

    const tipo = String(body.tipo || "").trim();

    return {
        tipo,
        ciclo: tipo === "Estudiante" ? String(body.ciclo || "").trim() : "Administrativo/Egresado",
        nombreEquipo: String(body.nombreEquipo || "").trim(),
        deporte,
        phone: String(body.phone || "").trim(),
        titulares,
        suplentes,
        jugadores,
    };
};

const validarDeportes = (data) => {
    if (!TIPOS_PERMITIDOS.has(data.tipo)) {
        return "Selecciona un tipo de participante válido.";
    }

    if (data.tipo === "Estudiante" && !CICLOS_ESTUDIANTE.has(data.ciclo)) {
        return "Selecciona un ciclo académico válido.";
    }

    if (!data.nombreEquipo) {
        return "Ingresa el nombre del equipo.";
    }

    if (!DEPORTES_PERMITIDOS.has(data.deporte)) {
        return "Selecciona un deporte válido.";
    }

    if (!/^\d{9}$/.test(data.phone)) {
        return "El celular debe tener exactamente 9 dígitos.";
    }

    const rules = getSportRules(data.deporte);
    const missingStarters = data.titulares.some((player) => !player);

    if (missingStarters) {
        return `Ingresa los ${rules.titulares} jugadores titulares con nombres y apellidos completos.`;
    }

    const extraPlayers = data.jugadores.slice(rules.titulares + rules.suplentes);
    if (extraPlayers.some(Boolean)) {
        return "Hay más jugadores de los permitidos para este deporte.";
    }

    return null;
};

module.exports = {
    SPORT_RULES,
    sanitizeDeportes,
    validarDeportes,
};
