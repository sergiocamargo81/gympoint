import React from 'react';
import { TouchableOpacity } from 'react-native';

import logo from '~/assets/logo.png';

import { Container, Image, TextInput } from './styles';

import Button from '~/components/Button';

export default function SignIn() {
  return (
    <Container>
      <Image source={logo} />
      <TextInput />
      <TouchableOpacity>
        <Button>Entrar no sistema</Button>
      </TouchableOpacity>
    </Container>
  );
}
