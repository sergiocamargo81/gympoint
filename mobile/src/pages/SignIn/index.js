import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const idRef = useRef();

  const [idStudent, setIdStudent] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(idStudent));

    // navigation.navigate('Checkins');
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          ref={idRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={idStudent}
          onChangeText={setIdStudent}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
