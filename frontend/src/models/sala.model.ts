export interface Sala {
  id?: string;
  numero: number;
  capacidade: number;
}

// Alias para compatibilidade
export type ISala = Sala;