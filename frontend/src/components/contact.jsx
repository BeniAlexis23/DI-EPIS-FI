import { useState } from "react";
import Swal from 'sweetalert2';

const initialState = {
  codEstudiante: "",
  name: "",
  lastnamePaterno: "",
  lastnameMaterno: "",
  phone: "",
  email: "",
  ciclo: "",
  message: "",
};

export const Contact = (props) => {

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearState = () => setFormData({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación extra: codEstudiante debe tener exactamente 10 dígitos numéricos
    if (!/^\d{10}$/.test(formData.codEstudiante)) {

      Swal.fire({
        icon: 'warning',
        title: 'Código inválido',
        text: 'El código de estudiante debe tener exactamente 10 dígitos.',
      });

      return;
    }

    try {
      const response = await fetch("https://api-formulario.episundc.pe/api/contacto" /* API produccion: "" */ , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu formulario fue enviado correctamente.',
          confirmButtonText: 'Aceptar',
        });
        clearState();
      } else if (response.status === 409) {
        Swal.fire({
          icon: 'info',
          title: 'Registro duplicado',
          text: result.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar',
          text: result.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error del servidor',
        text: error.message,
      });
    }
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Registro</h2>
                <p>
                  Completa el siguiente formulario para registrarte al evento. Recibirás un correo de confirmación con los detalles del evento. <br /> <br />Recuerda que los datos ingresados deben ser válidos y reales, ya que serán utilizados para la entrega de certificados.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="codEstudiante"
                        name="codEstudiante"
                        className="form-control"
                        placeholder="Codigo de Estudiante"
                        required
                        maxLength={10}
                        value={formData.codEstudiante}
                        onChange={(e) => {
                          // Solo permitir números (y hasta 10 caracteres)
                          const value = e.target.value;
                          if (/^\d{0,10}$/.test(value)) {
                            setFormData((prev) => ({ ...prev, codEstudiante: value }));
                          }
                        }}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
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
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Correo Institucional"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="Celular"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <select
                        id="ciclo"
                        name="ciclo"
                        className="form-control"
                        required
                        value={formData.ciclo}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione su ciclo académico</option>
                        <option value="I">I</option>
                        <option value="III">III</option>
                        <option value="V">V</option>
                        <option value="VII">VII</option>
                        <option value="IX">IX</option>
                        <option value="X">X</option>
                      </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="¿Que esperas del evento?"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Enviar
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Información de Contacto</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Ubicación
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Celular
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : "/"}>
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fa fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2025 Facultad de Ingeniería - UNDC
          </p>
        </div>
      </div>
    </div>
  );
};
