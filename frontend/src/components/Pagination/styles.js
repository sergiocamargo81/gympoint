import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  margin: 15px 0;

  display: flex;
  justify-content: center;
  align-items: baseline;

  span:first-child {
    color: #666;
  }
`;

export const PageLink = styled.button`
  background: #fff;
  border: 1px solid #666;
  color: #666;
  width: 30px;
  height: 30px;
  margin: 0 5px;

  border-radius: 4px;
  transition: background 0.1s color #fff border 0;

  &:hover {
    background: ${darken(0.1, '#ee4d64')};
    border: 0;
    color: #fff;
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
