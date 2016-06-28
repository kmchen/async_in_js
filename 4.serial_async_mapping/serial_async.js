let messages = ['msg 1', 'msg 2', 'msg 3'];

let result = [];

function eachAsync(iteratee, map, cb) {

  let pending = iteratee.slice();
  let index = 0;

  next();

  function next() {
    if(!pending.length) {
      cb(); 
    } else {
      map(pending.shift(), iteration);
    }
  };

  function iteration(err, data) {
    if (err) {
      cb(err); 
    } else {
      result[index] = data;
      index++;
      next();
    }
  }
};

eachAsync(messages, sent, done);

function done(err){
  if(err){
    console.error(err);
  } else {
    console.log('All messages sent');
    console.log(result);
  }
}

function sent(data, cb) {
  let err = Math.random() > 0.95 ? new Error('some error'):null;
  setTimeout(cb, randomTimout, err, data);
}

function randomTimout() {
  return Math.random() * 1e3;
}
