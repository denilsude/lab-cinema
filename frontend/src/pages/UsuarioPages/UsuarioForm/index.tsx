import { useState, useEffect } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { IUsuario } from "../../../models/usuario.model";

interface UsuarioFormProps {
    usuario: IUsuario | null;
    onSave: (usuario: IUsuario) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

export const UsuarioForm = ({ usuario, onSave, onCancel, errors = {} }: UsuarioFormProps) => {
    // Estado inicial padrão
    const defaultUsuario: IUsuario = { 
        id: '', 
        nome: '', 
        email: '', 
        senha: '', 
        status: 'ativo' // Mudei para ativo como padrão, parece mais lógico
    };

    const [usuarioState, setUsuarioState] = useState<IUsuario>(defaultUsuario);

    // Atualiza o formulário se o usuário selecionado para edição mudar
    useEffect(() => {
        if (usuario) {
            setUsuarioState(usuario);
        } else {
            setUsuarioState(defaultUsuario);
        }
    }, [usuario]);

    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">
                            {usuarioState.id ? '✏️ Editar Usuário' : '➕ Novo Usuário'}
                        </h5>
                    </div>
                    <div className="card-body bg-light">
                        <div className="container">
                            {/* Removida a tag <form> para evitar refresh acidental da página */}
                            <div className="d-flex flex-column gap-3">
                                <Input
                                    label="Nome"
                                    id="nome"
                                    type="text"
                                    placeholder="Digite o nome..."
                                    value={usuarioState.nome}
                                    onChange={(value) => setUsuarioState({ ...usuarioState, nome: value })}
                                    error={errors.nome}
                                    visible="true"
                                />
                                <Input
                                    label="Email"
                                    id="email"
                                    type="email"
                                    placeholder="Digite o email..."
                                    value={usuarioState.email}
                                    onChange={(value) => setUsuarioState({ ...usuarioState, email: value })}
                                    error={errors.email}
                                    visible="true"
                                />
                                <Input
                                    label="Senha"
                                    id="senha"
                                    type="password"
                                    placeholder="Digite a senha..."
                                    value={usuarioState.senha}
                                    onChange={(value) => setUsuarioState({ ...usuarioState, senha: value })}
                                    error={errors.senha}
                                    visible="true"
                                />
                                
                                {/* Campo de Status */}
                                <div>
                                    <label className="form-label">Status</label>
                                    <select 
                                        className="form-select"
                                        value={usuarioState.status}
                                        onChange={(e) => setUsuarioState({...usuarioState, status: e.target.value as 'ativo' | 'inativo'})}
                                    >
                                        <option value="ativo">Ativo</option>
                                        <option value="inativo">Inativo</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row m-2">
                            <div className="col-6">
                                <Button
                                    value="Cancelar"
                                    variant="secondary"
                                    type="button"
                                    onClick={onCancel}
                                />
                            </div>
                            <div className="col-6">
                                <Button
                                    value={usuarioState.id ? "Atualizar" : "Salvar"}
                                    variant={usuarioState.id ? "warning" : "success"}
                                    type="button" // Importante: type button para não submeter formulário
                                    onClick={() => onSave(usuarioState)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}