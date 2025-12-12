export interface Sessao {
  id?: string;
  filmeId: string;
  salaId: string;
  dataHora: string;
}

// Alias para compatibilidade
export type ISessao = Sessao;