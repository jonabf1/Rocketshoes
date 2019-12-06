import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import {
  addToCartSucess,
  updateAmountSucess,
  addToFavoriteSucess,
} from './actions';
import { formatPrice } from '../../../util/format';
// function* a declaração com asterisco é um generator
// esse generator equivale ao async/await em babel
// porem com funcionalidades diferentes

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSucess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      beforePriceFormatted: formatPrice(
        response.data.price + response.data.price * 0.2
      ),
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSucess(data));
    history.push('/cart');
  }
  // yield = await do babel
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }

  yield put(updateAmountSucess(id, amount));
}

function* addToFavorite({ id }) {
  const productExists = yield select(state =>
    state.favorite.find(p => p.id === id)
  );

  if (productExists) {
    return;
  }

  const response = yield call(api.get, `/products/${id}`);

  const data = {
    ...response.data,
  };

  yield put(addToFavoriteSucess(data));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
  takeLatest('@favorite/ADD_FAVORITE_REQUEST', addToFavorite),
]);
// código acima equivale aos reducers/actions
