import { all } from 'redux-saga/effects';

import sagas from './cart/sagas';

// loader de sagas
export default function* rootSaga() {
  return yield all([sagas]);
}
