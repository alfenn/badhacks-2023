const fs = require('fs');

const processData = (inputFile, outputFile) => {
  let output = []
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) throw err;

    const originalData = JSON.parse(data);    
    for (let i = 1; i < originalData.length; i++) {
      if (originalData[i].hasOwnProperty('dataType')) {
        let currPrompt = originalData[i].title + ' ' + originalData[i].body;
        i += 1;
        while (originalData[i].hasOwnProperty('type')) {
          let numberToSkip = originalData[i].numberOfreplies;
          
          if (originalData[i].username === 'AutoModerator'){
            i += 1;
            continue;
          }
          
          currResponse = originalData[i].body;
          let promptAndCompletion = {
            prompt: currPrompt,
            completion: currResponse
          };
          output.push(promptAndCompletion);
          i += 1;
          while(numberToSkip > 0 && originalData[i].hasOwnProperty('type')) {
            numberToSkip -= 1;
            numberToSkip += originalData[i].numberOfreplies;
            i += 1;
          }
        }
      }
    }

    fs.writeFile(outputFile, JSON.stringify(output), 'utf8', (err) => {
      if (err) throw err;
      console.log(`Data written to ${outputFile}`);
    });
  });
};


processData('dataset_reddit-scraper_2023-02-11_19-58-45-407.json', 'output.json');