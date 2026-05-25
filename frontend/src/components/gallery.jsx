import { Image } from "./image";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title section-title--gallery">
          <h2>Galería de Fotos</h2>
          <p>
            Recordemos los mejores momentos de la Facultad de Ingeniería conmemorando el Día del Ingeniero 2025.
          </p>
        </div>
        <div className="gallery-grid">
          {props.data
            ? props.data.map((d, i) => (
              <Image
                key={`${d.title}-${i}`}
                title={d.title}
                smallImage={d.smallImage}
              />
            ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
