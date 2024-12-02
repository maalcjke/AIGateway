import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class Agent {
    abstract readonly name: string
    
    public abstract calculateTokenCost(): number
    public abstract generateResponse(prompt: string, async?: boolean): string
}