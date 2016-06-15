import fs from 'fs';

fs.readFile(__filename, {encoding: 'utf-8'}, gotFileContent)

function gotFileContent(err, content) {
  if (err) {
    console.error(err);  
  } else {
    console.log(content);
  }
}
