import { useEffect } from "react";

const trackedSections = ["about", "services", "portfolio", "team"];

export const Navigation = () => {
  useEffect(() => {
    const applyActiveSection = () => {
      const current = trackedSections.reduce((active, sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return active;

        const sectionTop = section.offsetTop - 120;
        return window.scrollY >= sectionTop ? sectionId : active;
      }, "");

      const contactSection = document.getElementById("contact");
      const isContactVisible = contactSection && window.scrollY >= contactSection.offsetTop - 160;

      document.querySelectorAll("#menu .navbar-nav li.active").forEach((item) => {
        item.classList.remove("active");
      });

      if (current && !isContactVisible) {
        const activeLink = document.querySelector(`#menu .navbar-nav a[href="#${current}"]`);
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
  }, []);

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
          <a className="navbar-brand page-scroll d-flex align-items-center" href="#page-top" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="img/es-undc.png"
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
              <a href="#about" className="page-scroll">
                Acerca
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Actividades
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Galería
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Comité
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll nav-btn">
                Ponencias
              </a>
            </li>
            <li>
              <a href="/deportes" className="nav-btn nav-btn-sports">
                Deportes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

