import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MdAddShoppingCart,
  MdFavoriteBorder,
  MdFavorite,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Productlist, Load } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as cartActions from '../../store/modules/cart/actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      idProductForPeview: Boolean,
      loading: Boolean,
    };
  }

  async componentDidMount() {
    this.setState({ idProductForPeview: false, loading: true });

    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
      beforePriceFormatted: formatPrice(
        product.price + product.price * 0.2
      ),
      parcel:formatPrice(
        product.price / 4
      )
    }));

    this.setState({ products: data, loading: false });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  handleAddFavorite = id => {
    const { removeToFavorite, favorites } = this.props;

    if (favorites[id]) {
      delete favorites[id];
      return removeToFavorite(id);
    }

    const { addToFavoriteRequest } = this.props;

    addToFavoriteRequest(id);
  };

  render() {
    const {
      products,
      idProductForPeview,
      loading,
    } = this.state;
    const { amount, favorites } = this.props;

    return (
      <>
        <Productlist>
          {products.map(product => (
            <li key={product.id}>
              <header>
                <button
                  type="button"
                  onClick={() => this.handleAddFavorite(product.id)}
                >
                  {product.id === favorites[product.id] ? (
                    <MdFavorite color="#7159c1" size={25} />
                  ) : (
                    <MdFavoriteBorder color="#7159c1" size={25} />
                  )}
                </button>
              </header>
              <img
                onMouseEnter={() =>
                  this.setState({ idProductForPeview: product.id })
                }
                onMouseLeave={() => this.setState({ idProductForPeview: 0 })}
                src={
                  product.id !== idProductForPeview
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
              <button
                type="button"
                onClick={() => this.handleAddProduct(product.id)}
              >
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
}

Home.propTypes = {
  addToCartRequest: PropTypes.func.isRequired,
  addToFavoriteRequest: PropTypes.func.isRequired,
  removeToFavorite: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  amount: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  favorites: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
  favorites: state.favorite.reduce((acc, product) => {
    acc[product.id] = product.id;
    return acc;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(cartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
