import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdShoppingBasket, MdFavorite } from 'react-icons/md';
import { Container, Cart } from './styles';
import logo from '../../assets/logo.svg';

export default function Header() {
  const cartSize = useSelector(state => state.cart.length);
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>
      <nav>
        <Cart to="/cart">
          <div>
            <strong>Meu carrinho</strong>
            <span>{cartSize} itens</span>
          </div>
          <MdShoppingBasket size={36} color="#fff" />
        </Cart>
        <Cart to="/favorites">
          <div>
            <strong>Lista de desejos</strong>
            <MdFavorite size={30} color="#fff" />
          </div>
        </Cart>
      </nav>
    </Container>
  );
}
