import { consoleLog, runtimeError } from '../containers/Compiler/actions';

const log = console.log;
console.log = (...args) => {
  postMessage(consoleLog(args.join(', ')));
  log.apply(console, args);
};

onmessage = (event) => { // eslint-disable-line no-undef
  try {
    eval(event.data.code); // eslint-disable-line no-eval
  } catch (error) {
    postMessage(runtimeError(error.name, error.message));
  }
};

