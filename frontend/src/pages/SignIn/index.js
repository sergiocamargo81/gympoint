import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.png';

import { Container } from './styles';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Container>
      <img src={logo} alt="gympoint" />

      <Form onSubmit={handleSubmit}>
        <label>
          SEU E-MAIL
          <Input name="email" type="email" placeholder="exemplo@email.com" />
        </label>

        <label>
          SUA SENHA
          <Input name="password" type="password" placeholder="******" />
        </label>

        <button type="submit">Entrar no sistema</button>
      </Form>
    </Container>
  );
}
