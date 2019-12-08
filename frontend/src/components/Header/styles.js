import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 1px solid #eee;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
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
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

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
      font-size: 12px;
      color: red;
      font-weight: bold;
      border: 0;
      background: transparent;
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
