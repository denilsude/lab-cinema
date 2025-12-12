import { Sessao } from "../models/sessao.model";

const API_URL = "http://localhost:4000/sessoes";

export const SessaoService = {
  getAll: async (): Promise<Sessao[]> => {
    const response = await fetch(API_URL);
    return response.json();
  },

  create: async (sessao: Omit<Sessao, "id">): Promise<Sessao> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessao),
    });
    return response.json();
  },

  update: async (id: string, sessao: Partial<Sessao>): Promise<Sessao> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sessao),
    });
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  }
};