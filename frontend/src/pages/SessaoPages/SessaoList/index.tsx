import { useState } from "react";
import { Button } from "../../../components/Button";
import { VendaIngressoModal } from "./VendaIngressoModal";

import type { ISessao } from "../../../models/sessao.model";
import type { IFilme } from "../../../models/filme.model";
import type { ISala } from "../../../models/sala.model";

interface Props {
    sessoes: ISessao[];
    filmes: IFilme[];
    salas: ISala[];
    onEdit: (sessao: ISessao) => void;
    onDelete: (id: string) => void;
    sessaoEmEdicao: ISessao | null;
}

export const SessaoTable = ({
    sessoes,
    filmes,
    salas,
    onEdit,
    onDelete,
    sessaoEmEdicao
}: Props) => {

    const [sessaoVenda, setSessaoVenda] = useState<ISessao | null>(null);

    const getNomeFilme = (id: string) =>
        filmes.find(f => f.id === id)?.titulo || "N/D";

    const getNumeroSala = (id: string) =>
        salas.find(s => s.id === id)?.numero || 0;

    return (
        <>
            <table className="table table-striped shadow-sm mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Filme</th>
                        <th>Sala</th>
                        <th>Data/Horário</th>
                        <th>Ações</th>
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
                                <td className="d-flex gap-2">
                                    <Button
                                        variant="success"
                                        value="Vender"
                                        onClick={() => setSessaoVenda(sessao)}
                                        disabled={disable}
                                    />
                                    <Button
                                        variant="warning"
                                        value="Editar"
                                        onClick={() => onEdit(sessao)}
                                        disabled={disable}
                                    />
                                    <Button
                                        variant="danger"
                                        value="Excluir"
                                        onClick={() => onDelete(sessao.id!)}
                                        disabled={disable}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

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
