export const Team = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Comité General</h2>
          <p>
            Comité responsable de la organización del evento, conformado por autoridades de la Facultad de Ingeniería.
          </p>
        </div>
        <div className="team-grid">
          {props.data
            ? props.data.map((d, i) => (
              <div key={`${d.name}-${i}`} className="team-card reveal-scroll-item">
                <div className="team-card-inner">
                  <img src={d.img} alt={d.name} className="team-img" />
                  <div className="team-info">
                    <h4>{d.name}</h4>
                    <p>{d.job}</p>
                  </div>
                </div>
              </div>
            ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
