import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Container>
      <img src={logo} alt="gympoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
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
