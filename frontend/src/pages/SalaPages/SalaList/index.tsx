import { Sala } from "../../../models/sala.model";

interface SalaListProps {
  salas: Sala[];
}

export default function SalaList({ salas }: SalaListProps) {
  return (
    <div className="card">
      <div className="card-header bg-secondary text-white">
        <h5 className="mb-0">📋 Lista de Salas</h5>
      </div>
      <div className="card-body">
        <div className="row">
          {salas.length === 0 ? (
            <div className="col-12 text-center text-muted">
              Nenhuma sala cadastrada ainda.
            </div>
          ) : (
            salas.map((sala) => (
              <div key={sala.id} className="col-md-4 mb-3">
                <div className="card border-success">
                  <div className="card-body text-center">
                    <h3 className="text-success">
                      <i className="bi bi-door-open"></i>
                    </h3>
                    <h5 className="card-title">Sala {sala.numero}</h5>
                    <p className="card-text">
                      <i className="bi bi-people me-2"></i>
                      Capacidade: <strong>{sala.capacidade}</strong> pessoas
                    </p>
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