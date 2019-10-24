const fs = require('fs');
const JsonGenerator = require('./src/jsonGenerator');
const CsvGenerator = require('./src/csvGenerator');

fs.readFile('./in/thinka.csv', 'utf-8', (err, data) => {
  if (err) { 
    console.error(err);
    return;
  }
  const jgen = new JsonGenerator(data);
  const json = jgen.generate();
  const cgen = new CsvGenerator(json);
  const csv = cgen.generate();
  fs.writeFile('./out/thinka_converted.csv', csv, (err) => {
    if(err)console.error(err)
  });
});