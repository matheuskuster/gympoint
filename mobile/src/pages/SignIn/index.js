import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Logo,
  LogoImage,
  LogoText,
  Form,
  FormInput,
  SubmitButton,
} from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  async function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Logo>
        <LogoImage source={logo} />
        <LogoText>GYMPOINT</LogoText>
      </Logo>

      <Form>
        <FormInput
          placeholder="Informe seu ID de cadastro"
          onSubmitEditing={handleSubmit}
          onChangeText={setId}
        />
        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
