import fs from 'fs';
import path from 'path';
import async from 'async';

let dir = path.join(__dirname, 'tmp');
let destFile = path.join(dir, 'somefile')


function mkdir(cb) {
  fs.mkdir(dir, cb)
}

function read(cb) {
  fs.readFile(__filename, {encoding: 'utf-8'}, function(err, data) {
    if (err) {
      cb(err);
    } else {
      fileContent = data;
      cb(); 
    }
  });
}

function write(cb) {
  fs.writeFile(destFile, fileContent, cb);
}

let fileContent;

let operations = [mkdir, read, write];

async.series(operations, done);

function done(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('all done');
  }
}
