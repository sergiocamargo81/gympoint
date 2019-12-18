import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 900px;
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Panel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0 20px;

  span {
    flex-grow: 1;
    font-size: 24px;
    font-weight: bold;
  }

  button {
    width: 110px;
    height: 37px;
    text-transform: uppercase;
    background: #ccc;
    color: #fff;
    border: 0;
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

  > button.save {
    background: #ee4d64;
    margin-left: 20px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, '#ee4d64')};
    }
  }
`;

export const PlanData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 30px 30px 10px 30px;

  label {
    font-weight: bold;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
  }

  input {
    font-size: 16px;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin: 6px 0 6px 0;
    max-height: 45px;
    color: #444;

    &::placeholder {
      color: #999;
    }
  }

  input ~ span {
    color: red;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    label {
      width: 270px;
    }

    span:first-child {
      font-size: 16px;
      flex-grow: 1;
      padding: 12px;
      border-radius: 4px;
      border: 1px solid #ddd;
      margin: 6px 0 6px 0;
      max-height: 45px;
      color: #444;
      font-weight: normal;
      display: block;
      width: 270px;
      background: #f5f5f5;
    }
  }
`;
