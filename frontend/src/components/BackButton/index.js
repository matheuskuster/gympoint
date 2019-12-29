import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import { Container } from './styles';

export default function BackButton() {
  function handleNavigation() {
    history.goBack();
  }

  return (
    <Container>
      <button type="button" onClick={handleNavigation}>
        <MdKeyboardArrowLeft color="#fff" size={20} />
        VOLTAR
      </button>
    </Container>
  );
}
