const parseActivityText = (text = "") => {
  const parts = text.split(" - ");

  if (parts.length >= 3) {
    return {
      time: parts[0],
      endTime: parts[1],
      place: parts.slice(2).join(" - "),
    };
  }

  return {
    time: text,
    endTime: "",
    place: "",
  };
};

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container activities-panel">
        <div className="section-title">
          <h2>Cronograma de Actividades</h2>
          <p>
            Cronograma de actividades del evento, donde podrás encontrar la programación de las diferentes actividades que se llevarán a cabo el día 05/06/2025, en la Sede Académica de la Casa de la Cultura.
          </p>
        </div>

        <div className="activities-list" aria-label="Cronograma de actividades">
          {props.data
            ? props.data.map((d, i) => {
              const activity = parseActivityText(d.text);

              return (
                <article key={`${d.name}-${i}`} className="activity-row">
                  <div className="activity-row-icon" aria-hidden="true">
                    <i className={d.icon}></i>
                  </div>
                  <div className="activity-row-content">
                    <p>
                      <span className="activity-row-time">{activity.time}</span>
                      <span className="activity-row-separator">-</span>
                      <span>{d.name}</span>
                    </p>
                    {activity.place ? <small>{activity.place}</small> : null}
                  </div>
                </article>
              );
            })
            : "loading"}
        </div>
      </div>
    </div>
  );
};
