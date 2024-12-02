import { interval, map, Observable } from "rxjs";
import { Agent } from "../interfaces/agent.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OpenAIAgentService extends Agent {
    name: string = "claude";

    async calculateTokenCost(model: string, prompt: string): Promise<number> {
        return 10;
    }
    public generateResponse(prompt: string): Observable<String> {
        return interval(1000).pipe(map(() => prompt));
    }

}