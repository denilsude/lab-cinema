import { IIngresso } from "../models/ingresso.model";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export class IngressosService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            headers: { "Content-Type": "application/json" },
            ...options,
        });

        if (!response.ok) {
            const msg = await response.text();
            throw new Error(`Erro HTTP ${response.status}: ${msg}`);
        }

        return response.json() as Promise<T>;
    }

    async create(data: Omit<IIngresso, "id">): Promise<IIngresso> {
        return this.request<IIngresso>("ingressos", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async findAll(): Promise<IIngresso[]> {
        return this.request<IIngresso[]>("ingressos");
    }
}

export const ingressosService = new IngressosService();
