const fs = require('fs');
const JsonGenerator = require('./src/jsonGenerator');

fs.readFile('./in/thinka.csv', 'utf-8', (err, data) => {
  if (err) { 
    console.error(err);
    return;
  }
  const gen = new JsonGenerator(data);
  const json = gen.generate();
  console.log(json);
});