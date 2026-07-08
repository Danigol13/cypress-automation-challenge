import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function generateApiEvidence({ scenarioName, requestUrl, requestMethod, statusCode, responseBody }) {
  const outputDir = join(__dirname, '../cypress/evidencias/api_trello.feature');

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const templatePath = join(__dirname, 'templates/api-evidence-01.html');
  let template = readFileSync(templatePath, 'utf-8');

  const statusClass = statusCode >= 200 && statusCode < 300 ? 'status-ok' : 'status-err';
  const timestamp = new Date().toLocaleString('pt-BR');

  template = template
    .replace(/\{\{SCENARIO\}\}/g, scenarioName)
    .replace(/\{\{TIMESTAMP\}\}/g, timestamp)
    .replace(/\{\{REQUEST_URL\}\}/g, requestUrl)
    .replace(/\{\{REQUEST_METHOD\}\}/g, requestMethod)
    .replace(/\{\{STATUS_CODE\}\}/g, statusCode)
    .replace(/\{\{STATUS_CLASS\}\}/g, statusClass)
    .replace(/\{\{RESPONSE_BODY\}\}/g, JSON.stringify(responseBody, null, 2));

  const fileName = `${scenarioName.replace(/\s+/g, '_')}_${Date.now()}.html`;
  const outputFile = join(outputDir, fileName);
  writeFileSync(outputFile, template, 'utf-8');

  console.log(`Evidência API gerada: ${outputFile}`);
  return outputFile;
}
