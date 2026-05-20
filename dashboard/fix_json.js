const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, 'public/data/papers.json'), 'utf-8');

// Eliminar encabezados de JS
content = content.replace(/const fs = require\('fs'\);\nconst path = require\('path'\);\n\n\/\/ Real papers collected from research subagents\nconst realPapers = /, '');

// Fix bad keys
content = content.replace(/"year: "/g, '"year"');
content = content.replace(/"keyFindings: "/g, '"keyFindings"');
content = content.replace(/"relevanceToSIRCA: "/g, '"relevanceToSIRCA"');
content = content.replace(/"globalScore: "/g, '"globalScore"');

// Eliminar cualquier punto y coma extra al final si existiera
content = content.trim();
if (content.endsWith(';')) {
  content = content.slice(0, -1);
}

fs.writeFileSync(path.join(__dirname, 'public/data/papers.json'), content);
console.log("Fixed papers.json");
