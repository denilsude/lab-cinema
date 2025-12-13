export interface Filme {
  id?: string; // ✅ JÁ ESTÁ CORRETO
  titulo: string;
  sinopse: string;
  classificacao: string;
  duracao: number;
  genero: string;
  dataInicio: string;
  dataFim: string;
}

export type IFilme = Filme;