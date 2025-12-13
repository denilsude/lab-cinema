import type { Filme } from "../models/filme.model";

const API_URL = "http://localhost:4000/filmes";

export const FilmeService = {
  getAll: async (): Promise<Filme[]> => {
    const response = await fetch(API_URL);
    return response.json();
  },

  getById: async (id: string): Promise<Filme> => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  },

  create: async (filme: Omit<Filme, "id">): Promise<Filme> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filme),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  },
};