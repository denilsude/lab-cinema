import { useState } from "react";
import { LancheService } from "../../../services/lanche.service";
import { lancheSchema } from "../../../models/lanche.model";
import { z } from "zod";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

interface LancheFormProps {
    onLancheAdded: () => void;
}

export default function LancheForm({ onLancheAdded }: LancheFormProps) {
    const [form, setForm] = useState({
        nome: "",
        preco: "",
        tipo: "comida",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validatedData = lancheSchema.parse({
                ...form,
                preco: Number(form.preco),
            });

            await LancheService.create(validatedData as any);
            setForm({ nome: "",Qlpreco: "", tipo: "comida" });
            setErrors({});
            onLancheAdded();
            alert("Lanche cadastrado com sucesso!");
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        newErrors[err.path[0].toString()] = err.message;
                    }
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-danger text-white">
                <h5 className="mb-0">🍿 Cadastrar Lanche</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <Input
                                label="Nome"
                                id="nome"
                                type="text"
                                visible="true"
                                value={form.nome}
                                onChange={(val) => setForm({ ...form, nome: val })}
                                error={errors.nome}
                            />
                        </div>
                        <div className="col-md-4">
                            <Input
                                label="Preço (R$)"
                                id="preco"
                                type="number"
                                visible="true"
                                value={form.preco}
                                onChange={(val) => setForm({ ...form, preco: val })}
                                error={errors.preco}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Tipo</label>
                            <select
                                className="form-select"
                                value={form.tipo}
                                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                            >
                                <option value="comida">Comida</option>
                                <option value="bebida">Bebida</option>
                                <option value="combo">Combo</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Button value="Salvar Lanche" type="submit" variant="danger" onClick={() => {}} />
                    </div>
                </form>
            </div>
        </div>
    );
}