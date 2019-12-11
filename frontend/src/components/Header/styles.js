import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 1px solid #eee;
`;

export const Content = styled.div`
  height: 62px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      margin: 0 25px 0 15px;
      padding: 0 20px 0 20px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin: 0 10px 0 0;
  padding: 0 10px 0 0;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    button {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: red;
      border: 0;
      background: transparent;
      transition: font-weight 0.2s;

      &:hover {
        font-weight: bold;
      }
    }
  }
`;

export const MenuLink = styled(NavLink)`
  margin: 0 5px;
  padding: 10px;
  color: #999;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
`;
