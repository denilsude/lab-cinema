import { ILanche } from "../models/lanche.model";

const API_URL = "http://localhost:4000/lanches";

export const LancheService = {
    getAll: async (): Promise<ILanche[]> => {
        const response = await fetch(API_URL);
        return response.json();
    },

    create: async (lanche: Omit<ILanche, "id">): Promise<ILanche> => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lanche),
        });
        return response.json();
    },

    update: async (lanche: ILanche): Promise<ILanche> => {
        const response = await fetch(`${API_URL}/${lanche.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lanche),
        });
        return response.json();
    },

    delete: async (id: string): Promise<void> => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    },
};