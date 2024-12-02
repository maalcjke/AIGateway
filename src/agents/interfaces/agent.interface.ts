import { Observable } from "rxjs";

export interface IAgent {
    getName(): string;
    calculateTokenCost(model: string, prompt: string): Promise<number>;
    generateResponse(prompt: string, async?: string): Observable<String>;
}