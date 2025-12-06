import { Filme } from "../../../models/filme.model";

interface FilmeTableProps {
  filmes: Filme[];
  onDelete: (id: string) => void;
}

export default function FilmeTable({ filmes, onDelete }: FilmeTableProps) {
  return (
    <div className="card">
      <div className="card-header bg-secondary text-white">
        <h5 className="mb-0">📋 Lista de Filmes</h5>
      </div>
      <div className="card-body">
        <div className="row">
          {filmes.length === 0 ? (
            <div className="col-12 text-center text-muted">
              Nenhum filme cadastrado ainda.
            </div>
          ) : (
            filmes.map((filme) => (
              <div key={filme.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-film text-primary me-2"></i>
                      {filme.titulo}
                    </h5>
                    <p className="card-text text-muted small">{filme.sinopse}</p>
                    <div className="mb-2">
                      <span className="badge bg-info me-2">{filme.genero}</span>
                      <span className="badge bg-warning text-dark">{filme.classificacao}</span>
                    </div>
                    <p className="mb-1">
                      <i className="bi bi-clock me-2"></i>
                      <small>{filme.duracao} minutos</small>
                    </p>
                    <p className="mb-1">
                      <i className="bi bi-calendar-check me-2"></i>
                      <small>{filme.dataInicio} - {filme.dataFim}</small>
                    </p>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(filme.id)}
                    >
                      <i className="bi bi-trash me-1"></i>Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}