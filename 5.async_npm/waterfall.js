import fs from 'fs';
import path from 'path';
import async from 'async';

let dir = path.join(__dirname, 'tmp');
let destFile = path.join(dir, 'somefile')


function mkdir(cb) {
  fs.mkdir(dir, cb)
}

function read(cb) {
  fs.readFile(__filename, cb);
}

function write(data, cb) {
  fs.writeFile(destFile, data, cb);
}

let fileContent;

let operations = [mkdir, read, write];

async.waterfall(operations, done);

function done(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('all done');
  }
}

