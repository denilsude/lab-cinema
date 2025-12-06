import { useState } from "react";
import { SalaService } from "../../../services/sala.service";
import { z } from "zod";

const salaSchema = z.object({
  numero: z.number().positive("Número da sala deve ser maior que 0"),
  capacidade: z.number().positive("Capacidade deve ser maior que 0"),
});

interface SalaFormProps {
  onSalaAdded: () => void;
}

export default function SalaForm({ onSalaAdded }: SalaFormProps) {
  const [form, setForm] = useState({
    numero: "",
    capacidade: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = salaSchema.parse({
        numero: Number(form.numero),
        capacidade: Number(form.capacidade),
      });

      await SalaService.create(validatedData);
      setForm({ numero: "", capacidade: "" });
      setErrors({});
      onSalaAdded();
      alert("Sala cadastrada com sucesso!");
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
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">📝 Cadastrar Nova Sala</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Número da Sala</label>
              <input
                type="number"
                className={`form-control ${errors.numero ? "is-invalid" : ""}`}
                value={form.numero}
                onChange={(e) => setForm({ ...form, numero: e.target.value })}
              />
              {errors.numero && <div className="invalid-feedback">{errors.numero}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Capacidade</label>
              <input
                type="number"
                className={`form-control ${errors.capacidade ? "is-invalid" : ""}`}
                value={form.capacidade}
                onChange={(e) => setForm({ ...form, capacidade: e.target.value })}
              />
              {errors.capacidade && <div className="invalid-feedback">{errors.capacidade}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            <i className="bi bi-door-open me-2"></i>Cadastrar Sala
          </button>
        </form>
      </div>
    </div>
  );
}