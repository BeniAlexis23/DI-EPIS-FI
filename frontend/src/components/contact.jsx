import { useState } from "react";
import {
  showFormError,
  showFormInfo,
  showFormSuccess,
  showFormWarning,
} from "../utils/formAlerts";

const requiredFieldLabels = {
  name: "Nombres completos",
  lastnamePaterno: "Apellido paterno",
  lastnameMaterno: "Apellido materno",
  institutionalCode: "Código institucional",
  email: "Correo institucional",
  ciclo: "Clasificación",
};

const initialState = {
  name: "",
  lastnamePaterno: "",
  lastnameMaterno: "",
  institutionalCode: "",
  email: "",
  ciclo: "",
};

const sanitizeFormData = (data) => ({
  codEstudiante: data.institutionalCode.trim(),
  name: data.name.trim(),
  lastnamePaterno: data.lastnamePaterno.trim(),
  lastnameMaterno: data.lastnameMaterno.trim(),
  phone: "999999999",
  email: data.email.trim().toLowerCase(),
  ciclo: data.ciclo.trim(),
  message: "Registro al evento por el Día del Ingeniero",
});

const getValidationMessage = (data) => {
  const missingFields = Object.entries(requiredFieldLabels)
    .filter(([field]) => !String(data[field]).trim())
    .map(([, label]) => label);

  if (missingFields.length > 0) {
    return `Completa todos los campos requeridos: ${missingFields.join(", ")}.`;
  }

  if (!data.institutionalCode.trim()) {
    return "Ingresa tu código institucional.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    return "Ingresa un correo electrónico válido.";
  }

  return null;
};

export const Contact = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearState = () => setFormData({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMessage = getValidationMessage(formData);

    if (validationMessage) {
      showFormWarning(validationMessage);
      return;
    }

    const sanitizedData = sanitizeFormData(formData);

    try {
      const response = await fetch(
        "https://api-formulario.episundc.pe/api/contacto",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedData),
        },
      );

      const result = await response.json();

      if (response.ok) {
        showFormSuccess(
          "¡Registro exitoso!",
          "Tu formulario fue enviado correctamente. Revisa tu correo para confirmaciones del evento.",
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
        "No pudimos conectar con el servidor. Intenta de nuevo en unos minutos.",
      );
    }
  };

  return (
    <div id="contact" className="registration-section">
      <div className="container registration-form-container">
        <div className="row registration-content-grid">
          <div className="col-md-8">
            <div className="registration-form-shell registration-animate">
              <form name="sentMessage" onSubmit={handleSubmit}>
                <div className="form-intro">
                  <span>Datos personales</span>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Nombres completos</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Nombres Completos"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastnamePaterno">Apellido paterno</label>
                      <input
                        type="text"
                        id="lastnamePaterno"
                        name="lastnamePaterno"
                        className="form-control"
                        placeholder="Apellido Paterno"
                        required
                        value={formData.lastnamePaterno}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastnameMaterno">Apellido materno</label>
                      <input
                        type="text"
                        id="lastnameMaterno"
                        name="lastnameMaterno"
                        className="form-control"
                        placeholder="Apellido Materno"
                        required
                        value={formData.lastnameMaterno}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Correo</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="institutionalCode">
                        Código institucional
                      </label>
                      <input
                        type="text"
                        id="institutionalCode"
                        name="institutionalCode"
                        className="form-control"
                        required
                        value={formData.institutionalCode}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ciclo">Clasificación</label>
                      <select
                        id="ciclo"
                        name="ciclo"
                        className="form-control"
                        required
                        value={formData.ciclo}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar clasificación</option>
                        <option value="I CICLO">Estudiante - I</option>
                        <option value="II CICLO">Estudiante - II</option>
                        <option value="III CICLO">Estudiante - III</option>
                        <option value="V CICLO">Estudiante - V</option>
                        <option value="VII CICLO">Estudiante - VII</option>
                        <option value="IX CICLO">Estudiante - IX</option>
                        <option value="General">Público general</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-disclaimer">
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                  <span>
                    Antes de enviar, verifica tu correo y código institucional.
                    Estos datos se usarán para confirmar tu registro y emitir
                    certificados.
                  </span>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Enviar
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-4">
            <div className="registration-map-stack">
              <article className="registration-map-card contact-support-card registration-animate">
                <div className="map-card-copy">
                  <span>Información de contacto</span>
                  <p>
                    Canales disponibles para resolver dudas sobre registro,
                    asistencia y certificados.
                  </p>

                  <div className="contact-support-list">
                    <div className="contact-support-item">
                      <i className="fa fa-comments-o" aria-hidden="true"></i>
                      <div>
                        <strong>Consultas rápidas</strong>
                        <small>Registro, horarios y participación</small>
                      </div>
                    </div>
                    <div className="contact-support-item">
                      <i className="fa fa-clock-o" aria-hidden="true"></i>
                      <div>
                        <strong>Atención</strong>
                        <small>Lunes a viernes, 9:00 a.m. a 5:00 p.m.</small>
                      </div>
                    </div>
                    <div className="contact-support-item">
                      <i className="fa fa-envelope-o" aria-hidden="true"></i>
                      <div>
                        <strong>Correo</strong>
                        <small>dsistemas@undc.edu.pe</small>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <article className="registration-map-card registration-animate">
                <div className="map-card-copy">
                  <span>Ubicación principal</span>
                  <h3>Casa de la Cultura</h3>
                  <p>Referencia para las ponencias y actividades centrales.</p>
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
