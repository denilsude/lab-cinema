export interface Sessao {
  id?: string; // ✅ JÁ ESTÁ CORRETO
  filmeId: string;
  salaId: string;
  dataHora: string;
}

export type ISessao = Sessao;