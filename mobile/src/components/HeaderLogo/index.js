import React from 'react';

import logo from '~/assets/logo.png';

import { Container, LogoImage, LogoText } from './styles';

export default function HeaderLogo() {
  return (
    <Container>
      <LogoImage source={logo} />
      <LogoText>GYMPOINT</LogoText>
    </Container>
  );
}
