import React from 'react';

import logo from '~/assets/logo.png';

import { Container } from './styles';

export default function SignIn() {
  const password = 'id1';

  return (
    <Container>
      <img src={logo} alt="gympoint" />

      <form>
        <label>
          SEU E-MAIL
          <input type="email" placeholder="exemplo@email.com" />
        </label>

        <label>
          SUA SENHA
          <input id={password} type="password" placeholder="******" />
        </label>

        <button type="submit">Entrar no sistema</button>
      </form>
    </Container>
  );
}
