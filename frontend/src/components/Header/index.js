import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import logo from '~/assets/logo-small.png';

import { Container, Content, MenuLink, Profile } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const ActiveStyle = {
    color: '#444',
  };
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="gympoint" />
          <MenuLink activeStyle={ActiveStyle} to="/students">
            Alunos
          </MenuLink>
          <MenuLink activeStyle={ActiveStyle} to="/plans">
            Planos
          </MenuLink>
          <MenuLink activeStyle={ActiveStyle} to="/memberships">
            Matriculas
          </MenuLink>
          <MenuLink activeStyle={ActiveStyle} to="/help-orders/unanswer">
            Pedidos de Auxílio
          </MenuLink>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>Administrador</strong>
              <button onClick={handleSignOut}>Sair do Sistema</button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
