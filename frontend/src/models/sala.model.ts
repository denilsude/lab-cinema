export interface Sala {
  id?: string; // ✅ JÁ ESTÁ CORRETO
  numero: number;
  capacidade: number;
}

export type ISala = Sala;