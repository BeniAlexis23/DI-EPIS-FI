export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
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
                <a href="#contact" className="btn btn-custom btn-lg page-scroll">
                  Registro
                </a>
                <div className="hero-glass-grid" aria-hidden="true">
                  <div className="hero-glass-card hero-glass-card-one"></div>
                  <div className="hero-glass-card hero-glass-card-two"></div>
                  <div className="hero-glass-card hero-glass-card-three"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


