const log = console.log;
console.log = (...args) => {
  postMessage(args);
  log.apply(console, args);
};

onmessage = (event) => { // eslint-disable-line no-undef
  eval(event.data.code); // eslint-disable-line no-eval
};

