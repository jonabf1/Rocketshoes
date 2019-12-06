import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { bindActionCreators } from 'redux';
import { Container, ProductTable, Total } from './styles';
import * as cartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

class Cart extends Component {
  increment(item) {
    const { updateAmountRequest } = this.props;
    updateAmountRequest(item.id, item.amount + 1);
  }

  decrement(item) {
    const { updateAmountRequest } = this.props;
    updateAmountRequest(item.id, item.amount - 1);
  }

  render() {
    const { product, total, removeFromCart } = this.props;

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
                    <button type="button" onClick={() => this.decrement(item)}>
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={item.amount} />
                    <button type="button" onClick={() => this.increment(item)}>
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{item.subTotal}</strong>
                </td>
                <td>
                  <button type="button" onClick={() => removeFromCart(item.id)}>
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
        {product.length <= 0 && (
          <p className="no-items">Sem items no carrinho</p>
        )}
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
}

Cart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.array.isRequired,
  total: PropTypes.string.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  product: state.cart.map(item => ({
    ...item,
    subTotal: formatPrice(item.price * item.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(cartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
