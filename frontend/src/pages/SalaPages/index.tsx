import { useState, useEffect } from "react";
import { Sala } from "../../models/sala.model";
import { SalaService } from "../../services/sala.service";
import SalaForm from "./SalaForm";
import SalaList from "./SalaList";

export default function SalaPages() {
  const [salas, setSalas] = useState<Sala[]>([]);

  const loadSalas = async () => {
    const data = await SalaService.getAll();
    setSalas(data);
  };

  useEffect(() => {
    loadSalas();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">🪑 Gerenciamento de Salas</h1>
      <SalaForm onSalaAdded={loadSalas} />
      <SalaList salas={salas} />
    </div>
  );
}