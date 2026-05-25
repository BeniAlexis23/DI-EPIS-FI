export const Footer = () => {
  return (
    <footer id="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/img/es-undc.png" alt="EPIS UNDC" />
          <div>
            <p>DI EPIS - UNDC</p>
            <p className="footer-subtitle">Escuela Profesional de Ingeniería de Sistemas</p>
          </div>
        </div>
        <div className="footer-meta">
          <div className="footer-links" aria-label="Redes sociales">
            <a href="https://www.facebook.com/fiundc" aria-label="Facebook">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
          </div>
          <p>&copy; 2026 Facultad de Ingeniería - UNDC</p>
        </div>
      </div>
    </footer>
  );
};
