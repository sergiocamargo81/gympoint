import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Left, Center, Right, Logo, Back } from './styles';

export default function Header({ onBack }) {
  return (
    <Container>
      <Left>
        {onBack && (
          <TouchableOpacity onPress={onBack}>
            <Back />
          </TouchableOpacity>
        )}
      </Left>
      <Center>
        <Logo />
      </Center>
      <Right />
    </Container>
  );
}
