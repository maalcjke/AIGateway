import { Injectable } from "@nestjs/common";
import { Agent } from "../interfaces/agent.abstract";

@Injectable()
export class AnthropicAIAgentService extends Agent {
  name: string = "anthropic";
  
  calculateTokenCost(): number {
      return 12;
  }
  
  generateResponse(prompt: string, async?: boolean): string {
      throw new Error("Method not implemented.");
  }
}