import type { Sala } from "../models/sala.model";

const API_URL = "http://localhost:4000/salas";

export const SalaService = {
  getAll: async (): Promise<Sala[]> => {
    const response = await fetch(API_URL);
    return response.json();
  },

  create: async (sala: Omit<Sala, "id">): Promise<Sala> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sala),
    });
    return response.json();
  },
};