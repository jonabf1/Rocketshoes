import React, { useState, useEffect } from 'react';
import {
  MdAddShoppingCart,
  MdFavoriteBorder,
  MdFavorite,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Productlist, Load } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as cartActions from '../../store/modules/cart/actions';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [idProductForPreview, setIdProductForPreview] = useState(Boolean);
  const [loading, setLoading] = useState(Boolean);

  const amount = useSelector(state =>
    state.cart.reduce((qt, product) => {
      qt[product.id] = product.amount;
      return qt;
    }, {})
  );

  const favorites = useSelector(state =>
    state.favorite.reduce((acc, product) => {
      acc[product.id] = product.id;
      return acc;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      setIdProductForPreview(false);
      setLoading(true);

      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
        beforePriceFormatted: formatPrice(product.price + product.price * 0.2),
        parcel: formatPrice(product.price / 4),
      }));

      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    return dispatch(cartActions.addToCartRequest(id));
  }

  function handleAddFavorite(id) {
    if (favorites[id]) {
      delete favorites[id];
      return dispatch(cartActions.removeToFavorite(id));
    }
    return dispatch(cartActions.addToFavoriteRequest(id));
  }

  return (
    <>
      <Productlist>
        {products.map(product => (
          <li key={product.id}>
            <header>
              <button
                type="button"
                onClick={() => handleAddFavorite(product.id)}
              >
                {product.id === favorites[product.id] ? (
                  <MdFavorite color="#7159c1" size={25} />
                ) : (
                  <MdFavoriteBorder color="#7159c1" size={25} />
                )}
              </button>
            </header>
            <img
              onMouseEnter={() => setIdProductForPreview(product.id)}
              onMouseLeave={() => setIdProductForPreview(0)}
              src={
                product.id !== idProductForPreview
                  ? `${product.preview1}`
                  : `${product.preview2}`
              }
              alt={product.title}
            />
            <strong>{product.title}</strong>
            <div className="promotion">
              <span>{product.beforePriceFormatted}</span>
              <span>{product.priceFormatted}</span>
              <span>4x de {product.parcel}</span>
            </div>
            <button type="button" onClick={() => handleAddProduct(product.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />{' '}
                {amount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </Productlist>
      <Load loading={loading}>
        {loading && <FaSpinner color="#fff" size={30} />}
      </Load>
    </>
  );
}
