import React from 'react';
import { MdAdd } from 'react-icons/md';

import history from '~/services/history';
import { Container } from './styles';

export default function SubscribeButton() {
  function handleNavigation() {
    const { pathname } = history.location;

    history.push(`${pathname}/add`);
  }

  return (
    <Container>
      <button type="button" onClick={handleNavigation}>
        <MdAdd color="#fff" size={20} />
        CADASTRAR
      </button>
    </Container>
  );
}
