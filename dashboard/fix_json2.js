const fs = require('fs');
const path = require('path');

let content = fs.readFileSync(path.join(__dirname, 'public/data/papers.json'), 'utf-8');

// The file currently starts with '[' and ends with ']' but has unquoted keys and comments
// It is a valid JS array expression.
let arrayText = content;

// Eval the JS string to get an actual object
try {
  let jsArray = eval('(' + arrayText + ')');
  let validJson = JSON.stringify(jsArray, null, 2);
  fs.writeFileSync(path.join(__dirname, 'public/data/papers.json'), validJson);
  console.log("Successfully converted to valid JSON");
} catch(e) {
  console.error("Error evaluating array:", e);
}
