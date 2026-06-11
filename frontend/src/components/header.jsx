export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro" style={{ backgroundImage: "url(/img/banner1.png)" }}>
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-12 intro-text">
                {props.data && props.data.date && (
                  <div className="hero-date-badge">
                    <i className="fa fa-calendar" aria-hidden="true"></i> {props.data.date}
                  </div>
                )}
                <h1>
                  <span className="hero-title-light">Feliz día del</span>
                  <span className="hero-title-strong">Ingeniero</span>
                </h1>
                <p className="hero-copy">
                  {props.data
                    ? props.data.paragraph
                    : "Honrando a quienes transforman ideas en soluciones."}
                </p>
                <div className="hero-buttons-container">
                  <a href="/registro" className="btn btn-custom btn-lg">
                    Inscripción a ponencias
                  </a>
                  <a href="/deportes" target="_blank" rel="noopener noreferrer" className="btn btn-custom btn-lg">
                    Inscripción a deportes
                  </a>
                </div>
                <div className="hero-glass-grid" aria-hidden="true">
                  <div className="hero-glass-card" style={{ backgroundImage: "url(/img/home/1.webp)" }}></div>
                  <div className="hero-glass-card" style={{ backgroundImage: "url(/img/home/2.webp)" }}></div>
                  <div className="hero-glass-card" style={{ backgroundImage: "url(/img/home/3.webp)" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

