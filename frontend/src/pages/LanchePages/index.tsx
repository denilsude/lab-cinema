import { useState, useEffect } from "react";
import { ILanche } from "../../models/lanche.model";
import { LancheService } from "../../services/lanche.service";
import LancheForm from "./LancheForm";
import LancheTable from "./LancheTable";

export default function LanchePages() {
    const [lanches, setLanches] = useState<ILanche[]>([]);

    const loadLanches = async () => {
        try {
            const data = await LancheService.getAll();
            setLanches(data);
        } catch (error) {
            console.error("Erro ao carregar lanches", error);
        }
    };

    useEffect(() => {
        loadLanches();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja excluir este item do menu?")) {
            await LancheService.delete(id);
            loadLanches();
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-danger"><i className="bi bi-cup-straw me-2"></i>Bomboniere</h2>
            <LancheForm onLancheAdded={loadLanches} />
            <br />
            <LancheTable lanches={lanches} onDelete={handleDelete} />
        </div>
    );
}