import { Injectable, Logger } from '@nestjs/common';
import { Agent } from '../interfaces/agent.abstract';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegistryAgentsService {
  private static logger = new Logger(RegistryAgentsService.name, { timestamp: true });
  static registry: Map<string, Agent> = new Map<string, Agent>();
  
  static loadModule() {
    try {
      const applicationMode = String(process.env.NODE_ENV);
      if(applicationMode.includes('dev')) return this.dynamicModuleLoad();

      return this.staticModuleLoad();
    } catch (error) {
      if(error instanceof Error) {
          this.logger.error(`Inject agent modules failed: ${error.message}`);
      }

      return [];
    }
  }

  private static dynamicModuleLoad() {    
    const files = fs.readdirSync('./src/agents/services');
    const implementations: any = [];

    files.forEach((file) => {
      const module = require(`../services/${file}`);

      for (const exportedKey in module) {
        const exportedClass = module[exportedKey];
        
        // Если это класс-агент, регистрируем его
        // Да, здесь хард-код, но в рамках демо-проекта вроде как хватит
        if (typeof exportedClass === 'function' && this.isAgent(exportedClass)) {
          implementations.push({
            provide: exportedClass,
            useClass: exportedClass,
          });
          
          const model = new exportedClass() as Agent;
          this.registry.set(model.name, model);
        }
      }
    });

    this.logger.log(`Agents dynamic linked: ${implementations.length}`);
    
    return implementations;
  }

  // Статическая загрузка для build/production
  private static staticModuleLoad() {
    // В production используем предварительно сгенерированный файл
    try {
      const generatedImports = require('../.cache/generated-agent-imports');
      const implementations: any = [];

      for (const exportedClass of generatedImports.default) {
          implementations.push({
              provide: exportedClass,
              useClass: exportedClass,
          });

          const model = new exportedClass() as Agent;
          this.registry.set(model.name, model);
      }
      
      this.logger.log(`Agents static linked: ${implementations.length}`);

      return implementations

    } catch (error) {
      this.logger.error(`Inject static agent modules failed: ${error.message}`);
      return [];
    }
  }

  // Функция для проверки наследования от базового класса Agent
  private static isAgent(clazz: any): boolean {
    return clazz.prototype instanceof Agent;
  }
}