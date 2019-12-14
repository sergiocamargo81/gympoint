import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  text-align: center;
  background: #fff;
  color: #444444;

  > h1 {
    margin-top: 0;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 40px;

    > button {
      background: #ccc;
      width: 90px;
      text-transform: uppercase;
      color: #fff;
      border: 0;
      height: 37px;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#ccc')};
      }

      display: flex;
      align-items: center;
      justify-content: space-around;

      span {
        font-weight: bold;
        font-size: 14px;
        border: 0;
        margin: 0 15px 0 0;
        flex-grow: 0;
      }

      svg {
        flex-grow: 0;
        margin: 0 0 0 15px;
      }
    }

    > button#yes {
      background: #ee4d64;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#ee4d64')};
      }
    }
  }
`;
