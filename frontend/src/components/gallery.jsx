import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Image } from "./image";

export const Gallery = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const images = props.data || [];
  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  const closeModal = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }, [images.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.classList.add("gallery-modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("gallery-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeModal, showNext, showPrevious]);

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
          {images.length > 0
            ? images.map((d, i) => (
              <Image
                key={`${d.title}-${i}`}
                title={d.title}
                smallImage={d.smallImage}
                onOpen={() => setActiveIndex(i)}
              />
            ))
            : "Loading..."}
        </div>
      </div>

      {activeImage &&
        createPortal(
          <div
            className="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Foto ampliada"
            onClick={closeModal}
          >
            <div className="gallery-modal-content" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className="gallery-modal-close"
                onClick={closeModal}
                aria-label="Cerrar foto"
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>

              {images.length > 1 && (
                <button
                  type="button"
                  className="gallery-modal-nav gallery-modal-nav--prev"
                  onClick={showPrevious}
                  aria-label="Foto anterior"
                >
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
              )}

              <img src={activeImage.smallImage} alt={activeImage.title} />

              {images.length > 1 && (
                <button
                  type="button"
                  className="gallery-modal-nav gallery-modal-nav--next"
                  onClick={showNext}
                  aria-label="Foto siguiente"
                >
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
