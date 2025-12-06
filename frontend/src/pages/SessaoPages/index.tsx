import { useEffect, useState } from "react";
import type { ISessao } from "../../models/sessao.model";
import type { IFilme } from "../../models/filme.model";
import type { ISala } from "../../models/sala.model";
import { sessaoSchema } from "../../models/sessao.model";
import { sessoesService } from "../../services/sessao.service";
import { filmesService } from "../../services/filme.service";
import { salasService } from "../../services/sala.service";
import { SessaoForm } from "./SessaoForm";
// IMPORTANTE: Importando de ./SessaoList pois é o nome da sua pasta
import { SessaoTable } from "./SessaoList"; 

export const SessaoPages = () => {
    const [sessoes, setSessoes] = useState<ISessao[]>([]);
    const [filmes, setFilmes] = useState<IFilme[]>([]);
    const [salas, setSalas] = useState<ISala[]>([]);
    
    const [sessaoEmEdicao, setSessaoEmEdicao] = useState<ISessao | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [exibirForm, setExibirForm] = useState(false);

    useEffect(() => {
        carregarTudo();
    }, []);

    const carregarTudo = async () => {
        try {
            const [listaSessoes, listaFilmes, listaSalas] = await Promise.all([
                sessoesService.findAll(),
                filmesService.findAll(),
                salasService.findAll()
            ]);
            setSessoes(listaSessoes);
            setFilmes(listaFilmes);
            setSalas(listaSalas);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    const validarSessao = (sessao: ISessao) => {
        const resultado = sessaoSchema.safeParse(sessao);
        if (!resultado.success) {
            const novosErros: Record<string, string> = {};
            resultado.error.issues.forEach(issue => {
                if (issue.path[0]) novosErros[issue.path[0] as string] = issue.message;
            });
            setErrors(novosErros);
            return null;
        }
        setErrors({});
        return resultado.data as ISessao;
    };

    const handleSave = async (sessao: ISessao) => {
        const sessaoValidada = validarSessao(sessao);
        if (!sessaoValidada) return;

        try {
            if (sessaoValidada.id) {
                await sessoesService.update(sessaoValidada.id, sessaoValidada);
            } else {
                await sessoesService.create(sessaoValidada);
            }
            await carregarTudo();
            handleCancel();
        } catch (error) {
            console.error("Erro ao salvar sessão:", error);
        }
    };

    const handleEdit = (sessao: ISessao) => {
        setSessaoEmEdicao(sessao);
        setExibirForm(true);
        setErrors({});
    };

    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja cancelar esta sessão?")) {
            try {
                await sessoesService.delete(id);
                setSessoes(prev => prev.filter(s => s.id !== id));
            } catch (error) {
                console.error("Erro ao excluir:", error);
            }
        }
    };

    const handleCancel = () => {
        setSessaoEmEdicao(null);
        setExibirForm(false);
        setErrors({});
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Agendamento de Sessões</h2>
                {!exibirForm && (
                    <button className="btn btn-primary" onClick={() => setExibirForm(true)}>
                        <i className="bi bi-calendar-plus me-2"></i>Nova Sessão
                    </button>
                )}
            </div>

            {exibirForm ? (
                <SessaoForm
                    sessao={sessaoEmEdicao}
                    filmes={filmes}
                    salas={salas}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    errors={errors}
                />
            ) : (
                <SessaoTable
                    sessoes={sessoes}
                    filmes={filmes}
                    salas={salas}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    sessaoEmEdicao={sessaoEmEdicao}
                />
            )}
        </div>
    );
};