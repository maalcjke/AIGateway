export interface IAgent {
    getName(): string;
    calculateTokenCost(): number;
    generateResponse(prompt: string, async?: boolean): string;
}