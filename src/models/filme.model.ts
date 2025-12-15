import { z } from 'zod';

// Vamos definir os gêneros possíveis para o select
export const GENEROS = [
    'Ação', 'Comédia', 'Drama', 'Terror', 'Ficção Científica', 'Romance', 'Animação'
] as const;

export interface IFilme {
    id?: string;
    titulo: string;
    sinopse: string;
    classificacao: string; // ex: "Livre", "12 anos"
    duracao: number; // em minutos
    genero: string;
    dataInicioExibicao: string; // formato YYYY-MM-DD
    dataFimExibicao: string;
}

export const filmeSchema = z.object({
    id: z.string().optional(),
    titulo: z.string()
        .min(1, 'O título é obrigatório'),
    sinopse: z.string()
        .min(10, 'A sinopse deve ter no mínimo 10 caracteres'),
    classificacao: z.string()
        .min(1, 'A classificação é obrigatória'),
    duracao: z.coerce.number()
        .positive('A duração deve ser maior que 0'),
    genero: z.string()
        .min(1, 'Selecione um gênero'),
    dataInicioExibicao: z.string()
        .min(1, 'Data de início é obrigatória'),
    dataFimExibicao: z.string()
        .min(1, 'Data de fim é obrigatória')
});