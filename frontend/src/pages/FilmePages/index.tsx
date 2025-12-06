import { useState, useEffect } from "react";
import { Filme } from "../../models/filme.model";
import { FilmeService } from "../../services/filme.service";
import FilmeForm from "./FilmeForm";
import FilmeTable from "./FilmeTable";

export default function FilmePages() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  const loadFilmes = async () => {
    const data = await FilmeService.getAll();
    setFilmes(data);
  };

  useEffect(() => {
    loadFilmes();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Deseja excluir este filme?")) {
      await FilmeService.delete(id);
      loadFilmes();
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">🎬 Gerenciamento de Filmes</h1>
      <FilmeForm onFilmeAdded={loadFilmes} />
      <FilmeTable filmes={filmes} onDelete={handleDelete} />
    </div>
  );
}