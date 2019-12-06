import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5rem 0px;

  nav {
    display: flex;
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  svg {
    margin-left: 0.7rem;
  }

  div {
    text-align: right;
    margin-left: 2.2rem;
    display: flex;
    flex-direction: column;

    &:last-child {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    strong {
      color: #fff;
      font-size: 1.4rem;
    }

    span {
      font-size: 1.3rem;
      color: #999;
    }
  }
`;
