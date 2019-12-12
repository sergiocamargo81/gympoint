import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  margin: 15px 0;

  display: flex;
  align-items: baseline;
  justify-content: center;

  > div:nth-child(1) {
    flex: 1;

    display: flex;
    align-items: baseline;
    justify-content: flex-end;

    > span:first-child {
      color: #666;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 0;
      margin: 0 5px;
    }
  }

  > div:nth-child(2) {
    flex: 0;

    display: flex;
    align-items: baseline;
    justify-content: center;
  }

  > div:nth-child(3) {
    flex: 1;

    display: flex;
    align-items: baseline;
    justify-content: flex-start;
  }
`;

export const ActivePage = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${darken(0.1, '#ee4d64')};
  border: 0;
  color: #fff;
  width: 30px;
  height: 30px;
  margin: 0 5px;

  border-radius: 4px;
`;

export const PageLink = styled.button.attrs(props => ({
  type: 'button',
}))`
  background: #fff;
  border: 1px solid #eee;
  color: #666;
  width: 30px;
  height: 30px;
  margin: 0 5px;

  border-radius: 4px;
  transition: background 0.1s;

  &:hover {
    background: ${darken(0.1, '#ee4d64')};
    border: 0;
    color: #fff;
  }
`;

export const PageMove = styled.button.attrs(props => ({
  type: 'button',
}))`
  background: #fff;
  border: 0;
  color: #ee4d64;
  width: 30px;
  height: 30px;
  margin: 0 5px;

  border-radius: 4px;
  transition: background 0.1s;

  &:hover {
    background: ${darken(0.1, '#ee4d64')};
    color: #fff;
  }

  svg {
    padding: 0;
    border: 0;
    outline: 0;
    position: relative;
    top: 1px;
  }

  position: relative;
  top: 4px;
`;
