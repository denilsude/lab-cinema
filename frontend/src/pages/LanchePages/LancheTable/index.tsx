import { ILanche } from "../../../models/lanche.model";
import { Button } from "../../../components/Button";

interface LancheTableProps {
    lanches: ILanche[];
    onDelete: (id: string) => void;
}

export default function LancheTable({ lanches, onDelete }: LancheTableProps) {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
                <h5 className="mb-0">📋 Menu de Lanches</h5>
            </div>
            <div className="card-body p-0">
                <table className="table table-striped table-hover mb-0">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Preço</th>
                            <th className="text-end">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lanches.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center text-muted py-4">
                                    Nenhum lanche cadastrado.
                                </td>
                            </tr>
                        ) : (
                            lanches.map((lanche) => (
                                <tr key={lanche.id}>
                                    <td>{lanche.nome}</td>
                                    <td>
                                        <span className={`badge ${lanche.tipo === 'bebida' ? 'bg-info' : lanche.tipo === 'combo' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                            {lanche.tipo.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>R$ {Number(lanche.preco).toFixed(2)}</td>
                                    <td>
                                        <div className="d-flex justify-content-end gap-2">
                                            <div style={{ width: '100px' }}>
                                                <Button
                                                    value="Excluir"
                                                    variant="danger"
                                                    onClick={() => onDelete(lanche.id!)}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}