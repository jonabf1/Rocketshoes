import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  h1 {
    color: #999;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-left: 3px;
    }
  }

  .no-items {
    font-size: 2rem;
    color: gray;
    text-align: center;
    margin: 2rem;
  }

  footer {
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .buttonOff {
      cursor: not-allowed;
      opacity: 0.6;
    }

    button {
      background: #7159c1;
      color: #fff;
      border-radius: 4px;
      padding: 1.2rem 2rem;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }
    }
  }
`;
export const ProductTable = styled.table`
  width: 100%;

  .promotion {
    display: flex;
    span {
      margin-right: 1rem;
      &:first-child {
        text-decoration: line-through;
      }
      &:last-child {
        color: #7159c1;
      }
    }
  }

  thead th {
    color: #999;
    text-align: left;
    padding: 1.1rem;
    font-size: 1.4rem;
  }

  tbody td {
    padding: 1.2rem;
    border-bottom: 1px solid #eee;
  }

  img {
    max-height: 100px;
    height: 100%;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 1.8rem;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border-radius: 4px;
      border: 1px solid #ddd;
      color: #666;
      padding: 6px;
      max-width: 50px;
      width: 100%;
    }
  }

  button {
    padding: 6px;
    font-size: 1.5rem;
    color: #7159c1;
    font-weight: bold;
  }
`;
export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    font-size: 1.1rem;
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 2.5rem;
    margin-left: 5px;
  }
`;
