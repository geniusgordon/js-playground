import { takeEvery, eventChannel } from 'redux-saga';
import { take, put, call, fork, cancel } from 'redux-saga/effects';
import Worker from 'worker!./compiler-worker';

function* subscribe(worker) {
  return eventChannel((emit) => {
    worker.addEventListener('message', ({ data }) => {
      emit(data);
    });
    return () => {};
  });
}

function* watchConsole(worker) {
  const channel = yield call(subscribe, worker);
  while (true) { // eslint-disable-line
    const action = yield take(channel);
    yield put(action);
  }
}

function* execute(worker, store) {
  const code = store.getState().editor.getCurrentContent().getPlainText();
  worker.postMessage({ code });
}

function* watchExecute(worker, store) {
  yield* takeEvery('EXECUTE', execute, worker, store);
}

function* compiler(store) {
  while (true) { // eslint-disable-line
    const worker = new Worker();
    const executeTask = yield fork(watchExecute, worker, store);
    const consoleTask = yield fork(watchConsole, worker);
    yield take('TERMINATE');
    yield cancel(executeTask);
    yield cancel(consoleTask);
    worker.terminate();
  }
}

export default function* rootSaga(store) {
  yield fork(compiler, store);
}

