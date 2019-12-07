import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-small.png';

import { Container, Content, MenuLink, Profile } from './styles';

const ActiveStyle = {
  color: '#444',
};

export default function Header() {
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
              <Link to="/">Sair do Sistema</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
