import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export abstract class Agent {
    abstract readonly name: string
    
    public abstract calculateTokenCost(model: string, prompt: string): Promise<number>
    public abstract generateResponse(prompt: string): Observable<String>
}