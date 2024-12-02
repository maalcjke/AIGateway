import { Injectable } from "@nestjs/common";
import { Agent } from "../interfaces/agent.abstract";
import OpenAI from "openai";
import { Observable } from "rxjs";
const { encoding_for_model } = require("tiktoken");

@Injectable()
export class OpenAIAgentService extends Agent {
  name: string = "chatgpt";
  
  //TODO: Добавить в .env
  private openai = new OpenAI({
    apiKey: '<token>',
    baseURL: 'https://bothub.chat/api/v2/openai/v1'
  });

  async calculateTokenCost(model: string, prompt: string): Promise<number> {
    const enc = encoding_for_model('gpt-4o'); //Из-за того, что нет реализации версионности, то пока хард-код
    const tokens = enc.encode(prompt);
    // Считаем количество токенов
    const tokenCount = await tokens.length;
    enc.free();

    //8 рублей за один токен
    return tokenCount * 8;
  }
  
  generateResponse(prompt: string): Observable<string> {
    return new Observable<string>(observer => {
      (async () => {
        try {
          // Запрос к OpenAI API
          const stream = await this.openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            stream: true,
          });
  
          // Чтение данных из стрима
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              observer.next(content);
            } else {
              console.warn('Пустой фрагмент данных из стрима.');
            }
          }
  
          // Уведомление об успешном завершении
          observer.complete();
        } catch (error) {
          console.error('Ошибка при обработке ответа OpenAI:', error);
  
          // Возвращаем детализированную ошибку
          observer.error(
            `Ошибка при запросе к OpenAI API: ${error.message || 'Неизвестная ошибка'}`
          );
        }
      })();
    });
  }
  
}