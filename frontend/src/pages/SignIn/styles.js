import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 350px;
  background: #fff;
  border-radius: 4px;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;

  img {
    width: 153px;
    align-self: center;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      color: #444444;

      input {
        height: 44px;
        padding: 0 15px;
        margin: 10px 0 20px;
        border: 1px solid #dddddd;
        border-radius: 4px;

        &::placeholder {
          color: #999999;
        }
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
