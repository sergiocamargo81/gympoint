import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  > span:nth-child(2) {
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 20px;
    line-height: 26px;
    text-align: left;
    display: block;
    white-space: pre-line;
    max-height: 104px;
    overflow: auto;
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
    font-size: 16px;
    line-height: 26px;
    text-align: left;

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
    height: 45px;

    &:hover {
      background: ${darken(0.1, '#ee4d64')};
    }
  }
`;
