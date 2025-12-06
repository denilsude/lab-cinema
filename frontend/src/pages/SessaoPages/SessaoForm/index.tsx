import { useState } from "react";
import { SessaoService } from "../../../services/sessao.service";
import { Filme } from "../../../models/filme.model";
import { Sala } from "../../../models/sala.model";
import { z } from "zod";

const sessaoSchema = z.object({
  filmeId: z.string().min(1, "Selecione um filme"),
  salaId: z.string().min(1, "Selecione uma sala"),
  data: z.string().min(1, "Data é obrigatória").refine((date) => {
    return new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0));
  }, "A data não pode ser retroativa"),
  horario: z.string().min(1, "Horário é obrigatório"),
});

interface SessaoFormProps {
  filmes: Filme[];
  salas: Sala[];
  onSessaoAdded: () => void;
}

export default function SessaoForm({ filmes, salas, onSessaoAdded }: SessaoFormProps) {
  const [form, setForm] = useState({
    filmeId: "",
    salaId: "",
    data: "",
    horario: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = sessaoSchema.parse(form);

      await SessaoService.create(validatedData);
      setForm({ filmeId: "", salaId: "", data: "", horario: "" });
      setErrors({});
      onSessaoAdded();
      alert("Sessão agendada com sucesso!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-warning text-dark">
        <h5 className="mb-0">📝 Agendar Nova Sessão</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Filme</label>
              <select
                className={`form-select ${errors.filmeId ? "is-invalid" : ""}`}
                value={form.filmeId}
                onChange={(e) => setForm({ ...form, filmeId: e.target.value })}
              >
                <option value="">Selecione um filme...</option>
                {filmes.map((filme) => (
                  <option key={filme.id} value={filme.id}>
                    {filme.titulo}
                  </option>
                ))}
              </select>
              {errors.filmeId && <div className="invalid-feedback">{errors.filmeId}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Sala</label>
              <select
                className={`form-select ${errors.salaId ? "is-invalid" : ""}`}
                value={form.salaId}
                onChange={(e) => setForm({ ...form, salaId: e.target.value })}
              >
                <option value="">Selecione uma sala...</option>
                {salas.map((sala) => (
                  <option key={sala.id} value={sala.id}>
                    Sala {sala.numero} - Capacidade: {sala.capacidade}
                  </option>
                ))}
              </select>
              {errors.salaId && <div className="invalid-feedback">{errors.salaId}</div>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Data</label>
              <input
                type="date"
                className={`form-control ${errors.data ? "is-invalid" : ""}`}
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
              />
              {errors.data && <div className="invalid-feedback">{errors.data}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Horário</label>
              <input
                type="time"
                className={`form-control ${errors.horario ? "is-invalid" : ""}`}
                value={form.horario}
                onChange={(e) => setForm({ ...form, horario: e.target.value })}
              />
              {errors.horario && <div className="invalid-feedback">{errors.horario}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-warning">
            <i className="bi bi-calendar-check me-2"></i>Agendar Sessão
          </button>
        </form>
      </div>
    </div>
  );
}