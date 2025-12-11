import { useEffect, useState } from "react";
import type { ISessao } from "../../models/sessao.model";
import type { IFilme } from "../../models/filme.model";
import type { ISala } from "../../models/sala.model";

// CORREÇÃO: Importando os serviços com os nomes EXATOS que estão nos arquivos
import { SessaoService } from "../../services/sessao.service";
import { FilmeService } from "../../services/filme.service";
import { SalaService } from "../../services/sala.service";

import SessaoForm from "./SessaoForm";
import { SessaoTable } from "./SessaoList"; 

export default function SessaoPages() {
    const [sessoes, setSessoes] = useState<ISessao[]>([]);
    const [filmes, setFilmes] = useState<IFilme[]>([]);
    const [salas, setSalas] = useState<ISala[]>([]);
    
    // Estado simples para edição (apenas visual por enquanto)
    const [sessaoEmEdicao, setSessaoEmEdicao] = useState<ISessao | null>(null);

    const carregarTudo = async () => {
        try {
            // CORREÇÃO: Usando .getAll() em vez de .findAll()
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
                // Remove da lista local para atualizar a tela
                setSessoes(prev => prev.filter(s => s.id !== id));
            } catch (error) {
                console.error("Erro ao excluir:", error);
                alert("Erro ao excluir sessão.");
            }
        }
    };

    const handleEdit = (sessao: ISessao) => {
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
};