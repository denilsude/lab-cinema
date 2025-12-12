import { useState } from "react";
import { Button } from "../../../components/Button";
import { VendaIngressoModal } from "./VendaIngressoModal";
import { Sessao } from "../../../models/sessao.model";
import { Filme } from "../../../models/filme.model";
import { Sala } from "../../../models/sala.model";

interface Props {
    sessoes: Sessao[];
    filmes: Filme[];
    salas: Sala[];
    onEdit: (sessao: Sessao) => void;
    onDelete: (id: string) => void;
    sessaoEmEdicao: Sessao | null;
}

export const SessaoTable = ({
    sessoes,
    filmes,
    salas,
    onEdit,
    onDelete,
    sessaoEmEdicao
}: Props) => {

    const [sessaoVenda, setSessaoVenda] = useState<Sessao | null>(null);

    const getNomeFilme = (id: string) =>
        filmes.find(f => f.id === id)?.titulo || "N/D";

    const getNumeroSala = (id: string) =>
        salas.find(s => s.id === id)?.numero || 0;

    return (
        <>
            <div className="card">
                <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">📋 Sessões Agendadas</h5>
                </div>
                <div className="card-body p-0">
                    <table className="table table-striped table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Filme</th>
                                <th>Sala</th>
                                <th>Data/Horário</th>
                                <th className="text-end">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessoes.map(sessao => {
                                const disable = !!sessaoEmEdicao;

                                return (
                                    <tr key={sessao.id}>
                                        <td>{getNomeFilme(sessao.filmeId)}</td>
                                        <td>Sala {getNumeroSala(sessao.salaId)}</td>
                                        <td>{new Date(sessao.dataHora).toLocaleString("pt-BR")}</td>
                                        <td>
                                            <div className="d-flex justify-content-end gap-2">
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => setSessaoVenda(sessao)}
                                                    disabled={disable}
                                                >
                                                    <i className="bi bi-ticket me-1"></i>Vender
                                                </button>
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => onEdit(sessao)}
                                                    disabled={disable}
                                                >
                                                    <i className="bi bi-pencil me-1"></i>Editar
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => onDelete(sessao.id!)}
                                                    disabled={disable}
                                                >
                                                    <i className="bi bi-trash me-1"></i>Excluir
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {sessaoVenda && (
                <VendaIngressoModal
                    sessao={sessaoVenda}
                    filmeNome={getNomeFilme(sessaoVenda.filmeId)}
                    salaNumero={getNumeroSala(sessaoVenda.salaId)}
                    onClose={() => setSessaoVenda(null)}
                />
            )}
        </>
    );
};