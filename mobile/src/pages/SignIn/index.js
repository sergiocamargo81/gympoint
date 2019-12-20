import React, { useRef } from 'react';
import { Image } from 'react-native';

import PropTypes from 'prop-types';

import logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn({ navigation }) {
  const id = useRef();

  function handleSubmit() {
    navigation.navigate('Checkins');
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          ref={id}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
