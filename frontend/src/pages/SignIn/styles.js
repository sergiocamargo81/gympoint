import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 350px;
  background: #fff;
  border-radius: 4px;
  padding: 20px 20px;

  display: flex;
  flex-direction: column;

  img {
    width: 153px;
    align-self: center;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    label {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      color: #444444;
      margin: 15px 0 0;

      input {
        height: 44px;
        padding: 0 15px;
        margin: 5px 0 0;
        border: 1px solid #dddddd;
        border-radius: 4px;

        &::placeholder {
          color: #999999;
        }
      }
    }

    span {
      color: red;
      margin: 5px 0 5px;
      font-weight: bold;
    }

    button {
      margin: 20px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#ee4d64')};
      }
    }
  }
`;
