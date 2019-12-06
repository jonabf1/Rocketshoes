import styled, { keyframes, css } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes`
  from{
    transform:rotate(0deg);
  }
  to{
      transform: rotate(360deg)
  }
`;

export const Productlist = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  list-style: none;

  .promotion {
    display: flex;
    flex-direction:column;
    span {
        color: #7159c1;
        font-size: 2.1rem;
        font-weight: 700;
        margin-top:0.7rem;

      &:first-child {
        color: #8c8c8c;
        font-size: 1.5rem;
        margin-top:0.3rem;
        text-decoration: line-through;
      }
      &:last-child {
        color: #333;
        font-size: 1.5rem;
        font-weight: 400;
        margin-top:0.3rem;
        margin-bottom:10px;
      }
    }
  }

  header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
      transition: background 0.2s;
      display: flex;
      padding: 4px;
      align-items: center;
      background: #eeee !important;
      border-radius: 50%;
      &:hover {
        background: ${darken(0.02, '#eee')};
      }
    }
  }

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 2rem;
    border-radius: 4px;

    img {
      align-self: center;
      max-width: 250px;
      width: 100%;
      cursor: pointer;
    }

    > strong {
      line-height: 2rem;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-weight: bold;
      font-size: 2.1rem;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.2rem;
        background: rgba(0, 0, 0, 0.2);

        svg {
          margin-left: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;

export const Load = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
