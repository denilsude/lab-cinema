import { z } from "zod";

export interface ILanche {
    id?: string;
    nome: string;
    preco: number;
    tipo: 'comida' | 'bebida' | 'combo';
}

export const lancheSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    preco: z.number().positive("O preço deve ser maior que zero"),
    tipo: z.enum(['comida', 'bebida', 'combo'], {
        errorMap: () => ({ message: "Selecione um tipo válido" })
    })
});