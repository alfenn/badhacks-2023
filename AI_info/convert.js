const fs = require('fs');

const processData = (inputFile, outputFile) => {
  let output = ''
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) throw err;
    const originalData = JSON.parse(data);    
    originalData.forEach((item) => {
      output += JSON.stringify(item);
      output += '\n';
    });
    fs.writeFile(outputFile, output, 'utf8', (err) => {
      if (err) throw err;
      console.log(`Data written to ${outputFile}`);
    });
  });
}

processData('output_python.json', 'output.jsonl')