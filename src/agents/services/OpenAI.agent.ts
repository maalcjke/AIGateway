import { Injectable } from "@nestjs/common";
import { Agent } from "../interfaces/agent.abstract";
import OpenAI from "openai";
import { Observable } from "rxjs";
const { encoding_for_model } = require("tiktoken");

@Injectable()
export class OpenAIAgentService extends Agent {
  name: string = "gpt-4o";
  
  private openai = new OpenAI({
    apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3YjEyMWFlLWUwZDYtNDliMi1iNjlmLTBkNzE3ODkzYjgzOSIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3Mjc2OTA0MTgsImV4cCI6MjA0MzI2NjQxOH0.0_rVXKNuSCBP4MO6hBnTXAE0kE1h52xpwDSGPaR4vGM',
    baseURL: 'https://bothub.chat/api/v2/openai/v1'
  });

  async calculateTokenCost(model: string, prompt: string): Promise<number> {
    const enc = encoding_for_model(model);
    const tokens = enc.encode(prompt);
    // Считаем количество токенов
    const tokenCount = tokens.length;
    enc.free();

    //8 рублей за один токен
    return tokenCount * 8;
  }
  
  generateResponse(prompt: string): Observable<String> {
    return new Observable<string>(observer => {
      (async () => {
        try {
          const stream = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            stream: true, //Можно добавить async параметр в функцию, но в рамках демо - не будем
          });

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            observer.next(content);
          }
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }
}