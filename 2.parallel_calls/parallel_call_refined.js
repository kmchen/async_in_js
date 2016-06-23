composedCall({some: 'args'}, (err, result) => {
  if(err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

function composedCall (args, cb) {
  let pending = 0;
  let result = [];

  call1(args, handlingResult());
  call2(args, handlingResult());
  call3(args, handlingResult());

  function handlingResult() {
    let order = pending;
    pending++;
    return (err, data) => {
      if(err) {
        cb(err);
      } else {
        result[order] = data;
        pending--;
        if(!pending){
          console.log(result); 
        }
      }
    }; 
  }
};

function call1(args, cb) {
  setTimeout(cb, randomTimeout, null, randomValue());
}
function call2(args, cb) {
  setTimeout(cb, randomTimeout, null, randomValue());
}
function call3(args, cb) {
  setTimeout(cb, randomTimeout, null, randomValue());
}

function randomTimeout() {
  return Math.floor(Math.random() * 1e3);
}
function randomValue() {
  return Math.floor(Math.random() * 1e10);
}

