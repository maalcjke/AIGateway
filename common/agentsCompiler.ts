import * as fs from 'fs';
import * as path from 'path';
import { Agent } from '../src/agents/interfaces/agent.abstract';
//Можно вывести через .env
    //Для более четкой работы можно использовать path.resolve
    const filename: string = 'generated-agent-imports.ts';
    const outputDir: string = `src/agents/.cache/${filename}`;
    const inputDir: string = './src/agents/services';

    const imports: string[] = [];
    const registrations: string[] = [];

    const files = fs.readdirSync(inputDir);
  
    files.forEach((file) => {
      const module = require(`./src/agents/services/${file}`); //Множно тоже вывести в отдельную переменную

      for (const exportedKey in module) {
          const exportedClass = module[exportedKey];
          
          // Если это класс-агент, регистрируем его
          if (typeof exportedClass === 'function' && isAgent(exportedClass)) {
              const moduleName = exportedClass.name;
              const importPath = `../services/${path.basename(file, '.ts')}`;
              
              imports.push(`import * as ${moduleName} from '${importPath}';`);
              registrations.push(`...Object.values(${moduleName}).filter(cls => cls.prototype instanceof Agent)`);
          }
      }
    });

    const outputContent = `
        import { Agent } from '../interfaces/agent.abstract';
        ${imports.join('\n')}

        export default [
            ${registrations.join(',\n')}
        ];
    `;


    fs.writeFileSync('src/agents/.cache/generated-agent-imports.ts', outputContent.trim(), 'utf-8');
    console.log(`Static imports file generated at src/agents/.cache/generated-agent-imports.ts`);

    function isAgent(clazz: any): boolean {
        return clazz.prototype instanceof Agent;
      }