import { Sala } from "../models/sala.types";

const API_URL = "http://localhost:3000/salas";

export const SalaService = {
  getAll: async (): Promise<Sala[]> => {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("SALAS DA API:", data);
    return data;
  }
};
