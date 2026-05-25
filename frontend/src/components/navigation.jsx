import { useEffect } from "react";

const trackedSections = ["about", "speaker", "services", "portfolio", "team"];

const getSectionTop = (section) => section.getBoundingClientRect().top + window.scrollY;

export const Navigation = () => {
  const isHome = window.location.pathname === "/";

  useEffect(() => {
    const clearActiveItems = () => {
      document.querySelectorAll("#menu .navbar-nav li.active").forEach((item) => {
        item.classList.remove("active");
      });
    };

    if (!isHome) {
      clearActiveItems();
      return;
    }

    const applyActiveSection = () => {
      clearActiveItems();

      const firstSection = document.getElementById(trackedSections[0]);
      if (!firstSection || window.scrollY < getSectionTop(firstSection) - 180) return;

      const current = trackedSections.reduce((active, sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return active;

        const sectionTop = getSectionTop(section) - 180;
        return window.scrollY >= sectionTop ? sectionId : active;
      }, "");

      if (current) {
        const activeLink = document.querySelector(`#menu .navbar-nav a[href="/#${current}"]`);
        activeLink?.parentElement?.classList.add("active");
      }
    };

    const updateActiveSection = () => {
      window.requestAnimationFrame(applyActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isHome]);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll d-flex align-items-center" href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/img/es-undc.png"
              alt="logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
            DI EPIS - UNDC
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/#about" className="page-scroll">
                Acerca
              </a>
            </li>
            <li>
              <a href="/#speaker" className="page-scroll">
                Ponentes
              </a>
            </li>
            <li>
              <a href="/#services" className="page-scroll">
                Actividades
              </a>
            </li>
            <li>
              <a href="/#portfolio" className="page-scroll">
                Galería
              </a>
            </li>
            <li>
              <a href="/#team" className="page-scroll">
                Comité
              </a>
            </li>
            <li>
              <a href="/registro">
                Registro
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};
