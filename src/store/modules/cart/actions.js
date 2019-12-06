export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSucess(product) {
  return {
    type: '@cart/ADD_SUCESS',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}
export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  };
}
export function updateAmountSucess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCESS',
    id,
    amount,
  };
}
export function addToFavoriteRequest(id) {
  return {
    type: '@favorite/ADD_FAVORITE_REQUEST',
    id,
  };
}
export function addToFavoriteSucess(product) {
  return {
    type: '@favorite/ADD_FAVORITE_SUCESS',
    product,
  };
}

export function removeToFavorite(id) {
  return {
    type: '@favorite/REMOVE',
    id,
  };
}
