export const Speaker = (props) => {
  const speaker = props.data;

  return (
    <div id="speaker">
      <div className="container">
        <div className="speaker-grid">
          <div className="speaker-copy reveal-scroll-item">
            <span className="speaker-kicker">Ponente invitado</span>
            <h2>{speaker ? speaker.name : "Ponente"}</h2>
            <p className="text-justify">{speaker ? speaker.description : "loading..."}</p>
          </div>
          <div className="speaker-media reveal-scroll-item">
            <img
              src={speaker ? speaker.image : "img/team/05.webp"}
              className="img-responsive"
              alt={speaker ? speaker.name : "Ponente invitado"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
