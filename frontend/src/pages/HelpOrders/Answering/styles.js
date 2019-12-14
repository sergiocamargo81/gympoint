import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  > p {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  > p:nth-child(2) {
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 20px;
  }

  > textarea {
    width: 100%;
    height: 130px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding: 20px;
    font-size: 16px;
    font-family: Roboto;
    color: #666;
    resize: none;

    &::placeholder {
      color: #999;
    }
  }

  button {
    width: 100%;
    height: 37px;
    background: #ee4d64;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-weight: bold;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, '#ee4d64')};
    }
  }
`;
