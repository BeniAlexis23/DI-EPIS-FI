export const Navigation = (props) => {
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
                ACtividades
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
              <a href="#contact" className="page-scroll">
                Resgistro
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};