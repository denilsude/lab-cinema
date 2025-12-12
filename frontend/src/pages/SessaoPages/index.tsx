import { useEffect, useState } from "react";
import type { Sessao } from "../../models/sessao.model";
import type { Filme } from "../../models/filme.model";
import type { Sala } from "../../models/sala.model";

import { SessaoService } from "../../services/sessao.service";
import { FilmeService } from "../../services/filme.service";
import { SalaService } from "../../services/sala.service";

import SessaoForm from "./SessaoForm";
import { SessaoTable } from "./SessaoList"; 

export default function SessaoPages() {
    const [sessoes, setSessoes] = useState<Sessao[]>([]);
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [salas, setSalas] = useState<Sala[]>([]);
    const [sessaoEmEdicao, setSessaoEmEdicao] = useState<Sessao | null>(null);

    const carregarTudo = async () => {
        try {
            const [listaSessoes, listaFilmes, listaSalas] = await Promise.all([
                SessaoService.getAll(),
                FilmeService.getAll(),
                SalaService.getAll()
            ]);
            setSessoes(listaSessoes);
            setFilmes(listaFilmes);
            setSalas(listaSalas);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => {
        carregarTudo();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja cancelar esta sessão?")) {
            try {
                await SessaoService.delete(id);
                setSessoes(prev => prev.filter(s => s.id !== id));
            } catch (error) {
                console.error("Erro ao excluir:", error);
                alert("Erro ao excluir sessão.");
            }
        }
    };

    const handleEdit = (sessao: Sessao) => {
        setSessaoEmEdicao(sessao);
        console.log("Editar:", sessao);
        alert("Edição selecionada (implementação visual).");
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">📅 Gerenciamento de Sessões</h1>

            <SessaoForm 
                filmes={filmes} 
                salas={salas} 
                onSessaoAdded={carregarTudo} 
            />

            <SessaoTable
                sessoes={sessoes}
                filmes={filmes}
                salas={salas}
                onEdit={handleEdit}
                onDelete={handleDelete}
                sessaoEmEdicao={sessaoEmEdicao}
            />
        </div>
    );
}