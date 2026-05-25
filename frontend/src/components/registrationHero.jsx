export const RegistrationHero = ({
  data,
  titleLight = "Inscripción",
  titleStrong = "Ponencias",
}) => {
  return (
    <header className="registration-hero" style={{ backgroundImage: "url(/img/banner1.png)" }}>
      <div className="registration-hero-overlay">
        <div className="container">
          {data && data.date && (
            <div className="hero-date-badge">
              <i className="fa fa-calendar" aria-hidden="true"></i> {data.date}
            </div>
          )}
          <h1>
            <span className="hero-title-light">{titleLight}</span>
            <span className="hero-title-strong">{titleStrong}</span>
          </h1>
        </div>
      </div>
    </header>
  );
};
