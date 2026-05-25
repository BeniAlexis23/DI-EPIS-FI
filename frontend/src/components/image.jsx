export const Image = ({ title, smallImage }) => {
  return (
    <article className="gallery-card reveal-scroll-item">
      <div className="gallery-card-media">
        <img
          src={smallImage}
          className="img-responsive"
          alt={title}
          loading="lazy"
        />
        <div className="gallery-card-overlay" aria-hidden="true"></div>
      </div>
    </article>
  );
};
