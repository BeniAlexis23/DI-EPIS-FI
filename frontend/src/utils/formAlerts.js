import Swal from "sweetalert2";

const BASE_CONFIG = {
  background: "#0a1625",
  color: "#eef6ff",
  buttonsStyling: false,
  confirmButtonText: "Entendido",
  customClass: {
    popup: "epis-swal-popup",
    title: "epis-swal-title",
    htmlContainer: "epis-swal-text",
    confirmButton: "epis-swal-confirm",
    icon: "epis-swal-icon",
  },
};

const fireAlert = (options) => Swal.fire({ ...BASE_CONFIG, ...options });

export const showFormWarning = (text, title = "Revisa el formulario") =>
  fireAlert({
    icon: "warning",
    title,
    text,
    iconColor: "#f0c76a",
  });

export const showFormSuccess = (title, text) =>
  fireAlert({
    icon: "success",
    title,
    text,
    confirmButtonText: "Aceptar",
    iconColor: "#4ea6ff",
  });

export const showFormInfo = (title, text) =>
  fireAlert({
    icon: "info",
    title,
    text,
    iconColor: "#4ea6ff",
  });

export const showRegistrationClosed = () =>
  fireAlert({
    icon: "info",
    title: "Inscripciones cerradas",
    text: "Las inscripciones ya se cerraron, nos vemos el año próximo.",
    confirmButtonText: "Entendido",
    allowOutsideClick: false,
    allowEscapeKey: false,
    iconColor: "#f0c76a",
  });

export const showFormError = (title, text) =>
  fireAlert({
    icon: "error",
    title,
    text,
    iconColor: "#ffb4b4",
  });
