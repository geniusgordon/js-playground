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

export function runtimeError(error) {
  return {
    type: 'RUNTIME_ERROR',
    error,
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

