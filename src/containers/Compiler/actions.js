export function execute() {
  return {
    type: 'EXECUTE',
  };
}

export function terminate() {
  return {
    type: 'TERMINATE',
  };
}

export function runtimeError(name, message) {
  return {
    type: 'RUNTIME_ERROR',
    name,
    message,
  };
}

export function consoleLog(log) {
  return {
    type: 'CONSOLE_LOG',
    log,
  };
}

export function clearLog() {
  return {
    type: 'CLEAR_LOG',
  };
}

