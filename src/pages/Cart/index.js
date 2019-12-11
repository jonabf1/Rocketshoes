import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';
import * as cartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

export default function Cart() {
  const product = useSelector(state =>
    state.cart.map(item => ({
      ...item,
      subTotal: formatPrice(item.price * item.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalPrice, item) => {
        return totalPrice + item.price * item.amount;
      }, 0)
    )
  );

  const dispatch = useDispatch();

  function increment(item) {
    return dispatch(cartActions.updateAmountRequest(item.id, item.amount + 1));
  }

  function decrement(item) {
    return dispatch(cartActions.updateAmountRequest(item.id, item.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {product.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.preview1} alt={item.preview1} />
              </td>
              <td>
                <strong>{item.title}</strong>
                <div className="promotion">
                  <span>{item.beforePriceFormatted}</span>
                  <span>{item.priceFormatted}</span>
                </div>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(item)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={item.amount} />
                  <button type="button" onClick={() => increment(item)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{item.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(cartActions.removeFromCart(item.id))}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      {product.length <= 0 && <p className="no-items">Sem items no carrinho</p>}
      <footer>
        <button className={product.length <= 0 && 'buttonOff'} type="button">
          finalizar pedido
        </button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
