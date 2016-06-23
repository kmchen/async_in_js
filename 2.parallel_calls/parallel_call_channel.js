import _ from 'lodash';

composedCall({some: 'args'}, (err, result) => {
  if(err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

function composedCall (args, cb) {

  let channel = {
    fns: [], 
    process: 0,
    Add: function(fn, ...args) {
      this.process++;
      let index = this.fns.length;
      let func = {fn: fn, args: args};
      this.fns[index] = func;
      fn(...args, this.push(func));
    },
    end: function() {
      this.process--;
      if(this.process == 0) {
        let a = _.reduce(this.fns, function(slice, item) {
          slice.push(item.data);
          return slice;
        }, []);
        console.log(a);
      }
    },
    push(obj) {
      return (data) => {
        obj.data = data;
        return this;
      } 
    }
  }

  channel.Add(call1, args, handlingError());
  channel.Add(call2, args, handlingError());
  channel.Add(call3, args, handlingError());

 function handlingError() {
  return (err, data, cb) => {
    if(err) {
      cb(err);
    }
      cb(data).end();
  }; 
 }
};

function call1(args, fn, chan) {
  setTimeout(fn, randomTimeout, null, randomValue(), chan);
}
function call2(args, cb, chan) {
  setTimeout(cb, randomTimeout, null, randomValue(), chan);
}
function call3(args, cb, chan) {
  setTimeout(cb, randomTimeout, null, randomValue(), chan);
}

function randomTimeout() {
  return Math.floor(Math.random() * 1e3);
}
function randomValue() {
  return Math.floor(Math.random() * 1e10);
}
