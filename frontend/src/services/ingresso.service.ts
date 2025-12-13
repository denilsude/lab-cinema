import type { IIngresso } from "../models/ingresso.model";

const API_URL = "http://localhost:4000/ingressos";

export const ingressosService = {
    create: async (data: Omit<IIngresso, "id">): Promise<IIngresso> => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
        }

        return response.json();
    },

    findAll: async (): Promise<IIngresso[]> => {
        const response = await fetch(API_URL);
        return response.json();
    }
};