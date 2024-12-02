import { Injectable } from "@nestjs/common";
import { Agent } from "../interfaces/agent.abstract";

@Injectable()
export class OpenAIAgentService extends Agent {
  name: string = "openai";
  
  calculateTokenCost(): number {
      return 12;
  }
  
  generateResponse(prompt: string, async?: boolean): string {
      throw new Error("Method not implemented.");
  }
}