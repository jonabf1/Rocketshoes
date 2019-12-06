import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdDelete, MdFavorite } from 'react-icons/md';
import { bindActionCreators } from 'redux';
import { Container, ProductTable } from './styles';
import * as cartActions from '../../store/modules/cart/actions';

function Favorite({ product, removeToFavorite }) {
  return (
    <Container>
      {product.length > 0 && (
        <h1>
          Sua lista de desejos
          <MdFavorite size={30} color="red" />
        </h1>
      )}
      <ProductTable>
        <tbody>
          {product.map(item => (
            <tr key={product.id}>
              <td>
                <img src={item.preview1} alt={item.preview1} />
              </td>
              <td>
                <strong>{item.title}</strong>
              </td>
              <td>
                <button type="button" onClick={() => removeToFavorite(item.id)}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
              <td>
                <button type="button">Ver mais</button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      {product.length <= 0 && (
        <p className="no-items">Lista de desejos vazia</p>
      )}
    </Container>
  );
}

Favorite.propTypes = {
  product: PropTypes.shape.isRequired,
  removeToFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  product: state.favorite,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(cartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
