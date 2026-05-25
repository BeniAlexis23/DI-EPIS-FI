import { useMemo, useState } from "react";
import {
  showFormError,
  showFormInfo,
  showFormSuccess,
  showFormWarning,
} from "../utils/formAlerts";

const API_BASE = process.env.REACT_APP_API_URL || "https://api-formulario.episundc.pe";

const cycles = ["I", "II", "III", "V", "VII", "IX"];

const SPORT_RULES = {
  "Fútbol": { titulares: 7, suplentes: 3 },
  "Vóley": { titulares: 6, suplentes: 6 },
  "Básquet": { titulares: 5, suplentes: 3 },
};

const sports = [
  {
    value: "Fútbol",
    label: "Fútbol",
    description: "7 titulares · 3 suplentes",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 12l7 5-3 8h-8l-3-8 7-5z" />
        <path d="M12 22l8 3M36 22l-8 3M17 37l4-12M31 37l-4-12M18 17l-5-4M30 17l5-4" />
      </svg>
    ),
  },
  {
    value: "Vóley",
    label: "Vóley",
    description: "6 titulares · 6 suplentes",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="18" />
        <path d="M9 24c8-2 14-8 15-18" />
        <path d="M24 6c1 10 7 16 15 18" />
        <path d="M13 36c6-8 14-12 26-12" />
        <path d="M35 39c-5-8-12-13-22-15" />
      </svg>
    ),
  },
  {
    value: "Básquet",
    label: "Básquet",
    description: "5 titulares · 3 suplentes",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="18" />
        <path d="M6 24h36" />
        <path d="M24 6c6 6 9 12 9 18s-3 12-9 18" />
        <path d="M24 6c-6 6-9 12-9 18s3 12 9 18" />
        <path d="M11 13c8 6 18 6 26 0M11 35c8-6 18-6 26 0" />
      </svg>
    ),
  },
];

const initialState = {
  type: "",
  cycle: "",
  teamName: "",
  sport: "",
  phone: "",
  players: [],
};

const getSportRules = (sport) => SPORT_RULES[sport] || null;

const createPlayersArray = (sport, previousPlayers = []) => {
  const rules = getSportRules(sport);
  if (!rules) return [];

  const total = rules.titulares + rules.suplentes;
  return Array.from({ length: total }, (_, index) => previousPlayers[index] || "");
};

const getPlayerSlots = (sport) => {
  const rules = getSportRules(sport);
  if (!rules) return [];

  const slots = [];
  for (let index = 0; index < rules.titulares; index += 1) {
    slots.push({
      key: `starter-${index}`,
      label: `Titular ${index + 1}`,
      isStarter: true,
      index,
      required: true,
    });
  }
  for (let index = 0; index < rules.suplentes; index += 1) {
    slots.push({
      key: `substitute-${index}`,
      label: `Suplente ${index + 1}`,
      isStarter: false,
      index: rules.titulares + index,
      required: false,
    });
  }
  return slots;
};

const sanitizeSportsData = (data) => {
  const rules = getSportRules(data.sport);
  const players = data.players.map((player) => player.trim());
  const titulares = players.slice(0, rules.titulares);
  const suplentes = players.slice(rules.titulares).filter(Boolean);

  return {
    tipo: data.type,
    ciclo: data.type === "Estudiante" ? data.cycle : "Administrativo/Egresado",
    nombreEquipo: data.teamName.trim(),
    deporte: data.sport,
    phone: data.phone.trim(),
    jugadores: players,
    titulares,
    suplentes,
  };
};

const getValidationMessage = (data) => {
  const rules = getSportRules(data.sport);

  if (!data.type) return "Selecciona el tipo de participante.";
  if (data.type === "Estudiante" && !data.cycle) return "Selecciona el ciclo del equipo.";
  if (!data.teamName.trim()) return "Ingresa el nombre del equipo.";
  if (!data.sport) return "Selecciona el deporte.";
  if (!rules) return "Selecciona un deporte válido.";
  if (!/^\d{9}$/.test(data.phone)) return "El celular debe tener exactamente 9 dígitos.";

  const missingStarters = data.players.slice(0, rules.titulares).some((player) => !player.trim());
  if (missingStarters) {
    return `Ingresa los ${rules.titulares} jugadores titulares con nombres y apellidos completos.`;
  }

  return null;
};

const formatRosterSummary = (sport) => {
  const rules = getSportRules(sport);
  if (!rules) return "Selecciona un deporte para ver el cupo del equipo.";
  return `${rules.titulares} titulares y hasta ${rules.suplentes} suplentes`;
};

export const SportsRegistration = () => {
  const [formData, setFormData] = useState(initialState);

  const playerSlots = useMemo(() => getPlayerSlots(formData.sport), [formData.sport]);
  const activeRules = useMemo(() => getSportRules(formData.sport), [formData.sport]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && value !== "Estudiante" ? { cycle: "" } : {}),
    }));
  };

  const handleSportSelect = (sport) => {
    setFormData((prev) => ({
      ...prev,
      sport,
      players: createPlayersArray(sport, prev.players),
    }));
  };

  const handlePlayerChange = (index, value) => {
    setFormData((prev) => {
      const players = [...prev.players];
      players[index] = value;
      return { ...prev, players };
    });
  };

  const clearState = () => setFormData(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMessage = getValidationMessage(formData);

    if (validationMessage) {
      showFormWarning(validationMessage);
      return;
    }

    const sanitizedData = sanitizeSportsData(formData);

    try {
      const response = await fetch(`${API_BASE}/api/deportes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (response.ok) {
        showFormSuccess(
          "¡Equipo registrado!",
          "El registro deportivo fue enviado correctamente. Te contactaremos si necesitamos más datos."
        );
        clearState();
      } else if (response.status === 409) {
        showFormInfo("Registro duplicado", result.message);
      } else {
        showFormError("Error al enviar", result.message);
      }
    } catch (error) {
      showFormError(
        "Error del servidor",
        "No pudimos conectar con el servidor. Intenta de nuevo en unos minutos."
      );
    }
  };

  return (
    <div id="contact" className="registration-section sports-registration-section">
      <div className="container registration-form-container">
        <div className="row registration-content-grid">
          <div className="col-md-8">
            <div className="sports-form-shell registration-animate">
              <form name="sportsRegistration" onSubmit={handleSubmit}>
                <div className="form-intro">
                  <span>Datos del equipo</span>
                  <p>Registra a tu equipo para las actividades deportivas del Día del Ingeniero.</p>
                </div>

                <div
                  className={`sports-meta-grid ${
                    formData.type === "Estudiante" ? "sports-meta-grid--student" : ""
                  }`}
                >
                  <div
                    className={`form-group sports-meta-field ${
                      formData.type && formData.type !== "Estudiante" ? "sports-meta-field--full" : ""
                    }`}
                  >
                    <label htmlFor="type">Tipo</label>
                    <select
                      id="type"
                      name="type"
                      className="form-control"
                      required
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="Estudiante">Estudiante</option>
                      <option value="Administrativo/Egresado">Administrativo/Egresado</option>
                    </select>
                  </div>

                  {formData.type === "Estudiante" && (
                    <div className="form-group sports-meta-field">
                      <label htmlFor="cycle">Ciclo</label>
                      <select
                        id="cycle"
                        name="cycle"
                        className="form-control"
                        required
                        value={formData.cycle}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar ciclo</option>
                        {cycles.map((cycle) => (
                          <option key={cycle} value={cycle}>
                            {cycle}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="form-group sports-meta-field">
                    <label htmlFor="teamName">Nombre del equipo</label>
                    <input
                      type="text"
                      id="teamName"
                      name="teamName"
                      className="form-control"
                      required
                      value={formData.teamName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group sports-meta-field">
                    <label htmlFor="phone">Celular</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      required
                      maxLength={9}
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,9}$/.test(value)) {
                          setFormData((prev) => ({ ...prev, phone: value }));
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Deporte</label>
                  <div className="sport-choice-grid">
                    {sports.map((sport) => (
                      <button
                        key={sport.value}
                        type="button"
                        className={`sport-choice ${formData.sport === sport.value ? "is-selected" : ""}`}
                        onClick={() => handleSportSelect(sport.value)}
                        aria-pressed={formData.sport === sport.value}
                      >
                        <span className="sport-choice-icon">{sport.icon}</span>
                        <span>
                          <strong>{sport.label}</strong>
                          <small>{sport.description}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.sport && activeRules && (
                  <>
                    <div className="form-disclaimer sports-player-note">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      <span>
                        Indica nombres y apellidos completos. Los {activeRules.titulares} primeros jugadores son
                        titulares obligatorios
                        {activeRules.suplentes > 0
                          ? `; los ${activeRules.suplentes} siguientes son suplentes (opcionales).`
                          : "."}
                      </span>
                    </div>

                    <div className="players-grid">
                      {playerSlots.map((slot) => (
                        <div
                          key={slot.key}
                          className={`player-field ${slot.isStarter ? "is-starter" : "is-substitute"}`}
                        >
                          <label htmlFor={`player-${slot.index}`}>{slot.label}</label>
                          <input
                            type="text"
                            id={`player-${slot.index}`}
                            className="form-control"
                            placeholder="Nombres y apellidos completos"
                            required={slot.required}
                            value={formData.players[slot.index] || ""}
                            onChange={(e) => handlePlayerChange(slot.index, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <button type="submit" className="btn btn-custom btn-lg">
                  Registrar equipo
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-4">
            <div className="registration-map-stack">
              <article className="registration-map-card contact-support-card registration-animate">
                <div className="map-card-copy">
                  <span>Información deportiva</span>
                  <p>Consulta dudas sobre inscripción de equipos, horarios de participación y coordinación de partidos.</p>

                  <div className="contact-support-list">
                    <div className="contact-support-item">
                      <i className="fa fa-trophy" aria-hidden="true"></i>
                      <div>
                        <strong>Modalidades</strong>
                        <small>Fútbol (7+3), vóley (6+6) y básquet (5+3)</small>
                      </div>
                    </div>
                    <div className="contact-support-item">
                      <i className="fa fa-users" aria-hidden="true"></i>
                      <div>
                        <strong>Equipo</strong>
                        <small>{formatRosterSummary(formData.sport)}</small>
                      </div>
                    </div>
                    <div className="contact-support-item">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      <div>
                        <strong>Consultas</strong>
                        <small>987654312</small>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <article className="registration-map-card registration-animate">
                <div className="map-card-copy">
                  <span>Ubicación principal</span>
                  <h3>Casa de la Cultura</h3>
                  <p>Referencia para las actividades centrales del evento.</p>
                </div>
                <iframe
                  title="Mapa Casa de la Cultura"
                  src="https://maps.google.com/maps?q=Casa%20de%20la%20Cultura%20Ca%C3%B1ete%20Per%C3%BA&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
