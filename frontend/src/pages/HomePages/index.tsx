import { Link } from "react-router-dom";

export default function HomePages() { // ✅ DEVE SER export default
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-3 mb-3">
          <i className="bi bi-camera-reels text-primary"></i> CineWeb
        </h1>
        <p className="lead text-muted">Sistema de Gerenciamento de Cinema</p>
      </div>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card h-100 text-center border-primary shadow-sm">
            <div className="card-body">
              <i className="bi bi-film display-1 text-primary mb-3"></i>
              <h5 className="card-title">Filmes</h5>
              <p className="card-text">Cadastre e gerencie o catálogo de filmes</p>
              <Link to="/filmes" className="btn btn-primary">
                Gerenciar Filmes
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 text-center border-success shadow-sm">
            <div className="card-body">
              <i className="bi bi-door-open display-1 text-success mb-3"></i>
              <h5 className="card-title">Salas</h5>
              <p className="card-text">Configure as salas de exibição</p>
              <Link to="/salas" className="btn btn-success">
                Gerenciar Salas
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 text-center border-warning shadow-sm">
            <div className="card-body">
              <i className="bi bi-ticket-perforated display-1 text-warning mb-3"></i>
              <h5 className="card-title">Sessões</h5>
              <p className="card-text">Agende sessões e venda ingressos</p>
              <Link to="/sessoes" className="btn btn-warning">
                Gerenciar Sessões
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 text-center border-danger shadow-sm">
            <div className="card-body">
              <i className="bi bi-cup-straw display-1 text-danger mb-3"></i>
              <h5 className="card-title">Lanches</h5>
              <p className="card-text">Gerencie a bomboniere</p>
              <Link to="/lanches" className="btn btn-danger">
                Gerenciar Lanches
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted">
          <small>Desenvolvido com React + TypeScript + Bootstrap</small>
        </p>
      </div>
    </div>
  );
}