import * as fs from 'fs';
import * as path from 'path';

const outputFilePath = path.join(__dirname, '../src/agents/generated-agent-imports.ts');
const agentsDirectory = path.join(__dirname, '../src/agents/services');

function isAgentClass(content: string): boolean {
  return content.includes('extends Agent');
}

function generateStaticImports() {
  const files = fs.readdirSync(agentsDirectory);
  const imports: string[] = [];
  const registrations: string[] = [];

  files.forEach((file) => {
    const filePath = path.join(agentsDirectory, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    if (isAgentClass(content)) {
      const moduleName = path.basename(file, '.ts');
      const importPath = `../services/${moduleName}`;
      
      imports.push(`import * as ${moduleName}Module from '${importPath}';`);
      registrations.push(`...Object.values(${moduleName}Module).filter(cls => cls.prototype instanceof Agent)`);
    }
  });

  const outputContent = `
    ${imports.join('\n')}

    export default [
      ${registrations.join(',\n')}
    ];
  `;

  fs.writeFileSync(outputFilePath, outputContent.trim(), 'utf-8');
  console.log(`Static imports file generated at ${outputFilePath}`);
}

generateStaticImports();
