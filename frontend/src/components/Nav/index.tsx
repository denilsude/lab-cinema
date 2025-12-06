<Link className="navbar-brand" to="/" onClick={() => alert("🍿 Pipoca está cara, faz o L?")}>CineWeb 🍿</Link>

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-camera-reels me-2"></i>
          CineWeb
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/filmes">
                <i className="bi bi-film me-1"></i>
                Filmes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/salas">
                <i className="bi bi-door-open me-1"></i>
                Salas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sessoes">
                <i className="bi bi-ticket-perforated me-1"></i>
                Sessões
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}