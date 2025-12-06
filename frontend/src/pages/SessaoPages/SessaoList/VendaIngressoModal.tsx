import { useState } from "react";
import { ingressosService } from "../../../services/ingresso.service";
import type { ISessao } from "../../../models/sessao.model";

interface Props {
    sessao: ISessao;
    filmeNome: string;
    salaNumero: number;
    onClose: () => void;
}

export const VendaIngressoModal = ({
    sessao,
    filmeNome,
    salaNumero,
    onClose
}: Props) => {

    const [cliente, setCliente] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVenda = async () => {
        setLoading(true);

        try {
            await ingressosService.create({
                sessaoId: sessao.id!,
                cliente
            });

            alert("Ingresso vendido com sucesso!");
            onClose();
        } catch (err) {
            alert("Erro ao vender ingresso.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal fade show d-block" style={{ background: "#0007" }}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Venda de Ingresso</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <p><strong>Filme:</strong> {filmeNome}</p>
                        <p><strong>Sala:</strong> {salaNumero}</p>
                        <p><strong>Data/Hora:</strong> {new Date(sessao.dataHora).toLocaleString("pt-BR")}</p>

                        <label className="form-label mt-3">Nome do Cliente</label>
                        <input
                            className="form-control"
                            value={cliente}
                            onChange={(e) => setCliente(e.target.value)}
                            placeholder="Digite o nome"
                        />
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        <button
                            className="btn btn-primary"
                            disabled={!cliente || loading}
                            onClick={handleVenda}
                        >
                            {loading ? "Processando..." : "Confirmar Venda"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
