export const Speaker = (props) => {
  const speakers = Array.isArray(props.data)
    ? props.data
    : props.data
      ? [props.data]
      : [];

  return (
    <div id="speaker">
      <div className="container">
        {speakers.length > 0
          ? speakers.map((speaker, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={`${speaker.name}-${index}`}
                className={`speaker-grid ${isReversed ? "speaker-grid--reversed" : ""}`}
              >
                <div className="speaker-copy reveal-scroll-item">
                  <span className="speaker-kicker">Ponente invitado</span>
                  <h2>{speaker.name}</h2>
                  <p className="text-justify">{speaker.description}</p>
                </div>
                <div className="speaker-media reveal-scroll-item">
                  <img
                    src={speaker.image}
                    className="img-responsive"
                    alt={speaker.name}
                  />
                </div>
              </div>
            );
          })
          : (
            <div className="speaker-grid">
              <div className="speaker-copy reveal-scroll-item">
                <span className="speaker-kicker">Ponente invitado</span>
                <h2>Ponente</h2>
                <p>loading...</p>
              </div>
              <div className="speaker-media reveal-scroll-item">
                <img
                  src="img/team/05.webp"
                  className="img-responsive"
                  alt="Ponente invitado"
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
