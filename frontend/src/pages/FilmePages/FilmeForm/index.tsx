import { useState } from "react";
import { FilmeService } from "../../../services/filme.service";
import { z } from "zod";

const filmeSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  sinopse: z.string().min(10, "Sinopse deve ter no mínimo 10 caracteres"),
  classificacao: z.string().min(1, "Classificação é obrigatória"),
  duracao: z.number().positive("Duração deve ser maior que 0"),
  genero: z.string().min(1, "Gênero é obrigatório"),
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  dataFim: z.string().min(1, "Data de fim é obrigatória"),
});

interface FilmeFormProps {
  onFilmeAdded: () => void;
}

export default function FilmeForm({ onFilmeAdded }: FilmeFormProps) {
  const [form, setForm] = useState({
    titulo: "",
    sinopse: "",
    classificacao: "",
    duracao: "",
    genero: "",
    dataInicio: "",
    dataFim: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = filmeSchema.parse({
        ...form,
        duracao: Number(form.duracao),
      });

      await FilmeService.create(validatedData);
      setForm({
        titulo: "",
        sinopse: "",
        classificacao: "",
        duracao: "",
        genero: "",
        dataInicio: "",
        dataFim: "",
      });
      setErrors({});
      onFilmeAdded();
      alert("Filme cadastrado com sucesso!");
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
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">📝 Cadastrar Novo Filme</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              />
              {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Classificação</label>
              <select
                className={`form-select ${errors.classificacao ? "is-invalid" : ""}`}
                value={form.classificacao}
                onChange={(e) => setForm({ ...form, classificacao: e.target.value })}
              >
                <option value="">Selecione...</option>
                <option value="Livre">Livre</option>
                <option value="10">10 anos</option>
                <option value="12">12 anos</option>
                <option value="14">14 anos</option>
                <option value="16">16 anos</option>
                <option value="18">18 anos</option>
              </select>
              {errors.classificacao && <div className="invalid-feedback">{errors.classificacao}</div>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Gênero</label>
              <input
                type="text"
                className={`form-control ${errors.genero ? "is-invalid" : ""}`}
                value={form.genero}
                onChange={(e) => setForm({ ...form, genero: e.target.value })}
              />
              {errors.genero && <div className="invalid-feedback">{errors.genero}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Duração (minutos)</label>
              <input
                type="number"
                className={`form-control ${errors.duracao ? "is-invalid" : ""}`}
                value={form.duracao}
                onChange={(e) => setForm({ ...form, duracao: e.target.value })}
              />
              {errors.duracao && <div className="invalid-feedback">{errors.duracao}</div>}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Sinopse</label>
            <textarea
              className={`form-control ${errors.sinopse ? "is-invalid" : ""}`}
              rows={3}
              value={form.sinopse}
              onChange={(e) => setForm({ ...form, sinopse: e.target.value })}
            />
            {errors.sinopse && <div className="invalid-feedback">{errors.sinopse}</div>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Data de Início</label>
              <input
                type="date"
                className={`form-control ${errors.dataInicio ? "is-invalid" : ""}`}
                value={form.dataInicio}
                onChange={(e) => setForm({ ...form, dataInicio: e.target.value })}
              />
              {errors.dataInicio && <div className="invalid-feedback">{errors.dataInicio}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Data de Fim</label>
              <input
                type="date"
                className={`form-control ${errors.dataFim ? "is-invalid" : ""}`}
                value={form.dataFim}
                onChange={(e) => setForm({ ...form, dataFim: e.target.value })}
              />
              {errors.dataFim && <div className="invalid-feedback">{errors.dataFim}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            <i className="bi bi-camera-reels me-2"></i>Cadastrar Filme
          </button>
        </form>
      </div>
    </div>
  );
}