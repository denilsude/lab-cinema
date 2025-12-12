export interface Filme {
  id?: string;
  titulo: string;
  sinopse: string;
  classificacao: string;
  duracao: number;
  genero: string;
  dataInicio: string;
  dataFim: string;
}

// Alias para compatibilidade
export type IFilme = Filme;