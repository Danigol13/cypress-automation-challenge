// Upload de resultados Cucumber para JIRA Xray
// Requer: JIRA_BASE_URL e JIRA_TOKEN no arquivo .env

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;

if (!JIRA_BASE_URL || !JIRA_TOKEN) {
  console.warn('[Xray] JIRA_BASE_URL e JIRA_TOKEN não configurados. Upload ignorado.');
  process.exit(0);
}

const reportPath = join(__dirname, '../cypress/results/cucumber-report.json');

try {
  const report = readFileSync(reportPath, 'utf-8');

  const response = await fetch(`${JIRA_BASE_URL}/rest/raven/1.0/import/execution/cucumber`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${JIRA_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: report,
  });

  const result = await response.json();
  console.log('[Xray] Upload concluído:', result);
} catch (error) {
  console.error('[Xray] Erro ao fazer upload:', error.message);
  process.exit(1);
}
