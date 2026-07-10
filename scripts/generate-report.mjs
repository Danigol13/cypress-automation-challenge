import report from 'multiple-cucumber-html-reporter';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

report.generate({
  jsonDir: join(__dirname, '../cypress/results'),
  reportPath: join(__dirname, '../cypress/results/report'),
  metadata: {
    browser: { name: 'electron', version: '118' },
    device: 'Local',
    platform: { name: 'Windows', version: '11' },
  },
  customData: {
    title: 'Relatório de Automação',
    data: [
      { label: 'Projeto', value: 'Automation Challenge - Cypress + Cucumber' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Ambiente', value: process.env.ENVIRONMENT || 'production' },
      { label: 'Executado em', value: new Date().toLocaleString('pt-BR') },
    ],
  },
});

console.log('Relatório gerado em: cypress/results/report/index.html');
