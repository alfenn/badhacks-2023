const fs = require('fs');

const processData = (inputFile, outputFile) => {
  let output = []
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) throw err;

    const originalData = JSON.parse(data);    
    for (let i = 1; i < 20; i++) {
      // console.log(originalData[i]);
      if (originalData[i].hasOwnProperty('dataType')) {
        let currPrompt = originalData[i].title + ' ' + originalData[i].body;
        console.log(originalData[i].username);
        i += 1;
        while (i < originalData.length && originalData[i].hasOwnProperty('type')) {
          let numberToSkip = originalData[i].numberOfreplies;
          
          if (originalData[i].username === 'AutoModerator'){
            console.log(originalData[i].username);
            i += 1;
            continue;
          }
          
          currResponse = originalData[i].body;
          let promptAndCompletion = {
            prompt: currPrompt,
            completion: currResponse
          };
          output.push(promptAndCompletion);
          console.log(originalData[i].username);
          i += 1;
          while(numberToSkip > 0 && originalData[i].hasOwnProperty('type')) {
            numberToSkip -= 1;
            numberToSkip += originalData[i].numberOfreplies;
            console.log(originalData[i].username);
            i += 1;
          }
        }
        if(originalData.hasOwnProperty('dataType')){
          console.log(originalData[i].username);
          i -= 1;
        }
      }
      console.log(originalData[i].username);
    }

    fs.writeFile(outputFile, JSON.stringify(output), 'utf8', (err) => {
      if (err) throw err;
      console.log(`Data written to ${outputFile}`);
    });
  });
};


processData('dataset_reddit-scraper_2023-02-11_22-21-58-136.json', 'output.json');