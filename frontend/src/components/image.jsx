export const Image = ({ title, smallImage, onOpen }) => {
  return (
    <article className="gallery-card reveal-scroll-item">
      <button
        type="button"
        className="gallery-card-media"
        onClick={onOpen}
        aria-label={`Ver foto ${title}`}
      >
        <img
          src={smallImage}
          className="img-responsive"
          alt={title}
          loading="lazy"
        />
        <div className="gallery-card-overlay" aria-hidden="true"></div>
      </button>
    </article>
  );
};
