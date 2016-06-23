composedCall({some: 'args'}, (err, result) => {
  if(err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

function composedCall (args, cb) {
 call1(args, handlingError(result1 => {
  call2(args, handlingError(result2 => {
    call3(args, handlingError(result3 => {
      cb(null, [result1, result2, result3]);
    })); 
  })); 
 })); 

 function handlingError(fn) {
  return (err, data) => {
    if(err) {
      cb(err);
    } else {
      fn(data);
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
