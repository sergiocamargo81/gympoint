import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import logo from '~/assets/logo.png';

import { Container, Image, Button, ButtonText, TextInput } from './styles';

export default function SignIn() {
  return (
    <Container>
      <Image source={logo} />
      <TextInput />
      <TouchableOpacity>
        <Button>
          <ButtonText>Entrar no sistema</ButtonText>
        </Button>
      </TouchableOpacity>
    </Container>
  );
}
