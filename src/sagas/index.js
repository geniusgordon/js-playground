import { takeEvery, eventChannel } from 'redux-saga';
import { take, put, call, fork } from 'redux-saga/effects';
import Worker from 'worker!./compiler-worker';
import { consoleLog } from '../containers/Compiler/actions';

function* subscribe(worker) {
  return eventChannel((emit) => {
    worker.addEventListener('message', ({ data }) => {
      emit(consoleLog(data.join(', ')));
    });
    return () => {};
  });
}

function* watchConsoleLog(worker) {
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
  const worker = new Worker();
  yield fork(watchExecute, worker, store);
  yield fork(watchConsoleLog, worker);
}

export default function* rootSaga(store) {
  yield fork(compiler, store);
}

