import { useEffect, useState } from "react";
import { Sala } from "../models/sala.types";
import { SalaService } from "../services/sala.service";

export function Salas() {
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    SalaService.getAll().then(setSalas);
  }, []);

  return (
    <div>
      <h1>Salas</h1>

      {salas.length === 0 && <p>Sem dados</p>}

      <ul>
        {salas.map((sala) => (
          <li key={sala.id}>{sala.nome}</li>
        ))}
      </ul>
    </div>
  );
}
