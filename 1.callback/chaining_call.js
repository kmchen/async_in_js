import fs from 'fs';
import path from 'path';

let dir = path.join(__dirname, 'tmp');
let destFile = path.join(dir, 'somefile')

fs.mkdir(dir, handlingErr(handleMkdir))

function handleMkdir() {
  fs.readFile(__filename, {encoding: 'utf-8'}, handlingErr(handleRead));
}

function handleRead(content) {
  fs.writeFile(destFile, content, handlingErr(handleWrite));
}

function handleWrite() {
  console.log('All done');
}

function handleErr(err) {
 if(err) {
  console.error(err);
 }
}

function handlingErr(cb) {
  return function(err, data) {
   if (err) {
    handleErr(err) 
   } else {
     cb(data);
   }
  }
}
