import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import Worker from 'worker!./compiler-worker';

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
}

export default function* rootSaga(store) {
  yield fork(compiler, store);
}

