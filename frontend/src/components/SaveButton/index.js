import React from 'react';
import PropTypes from 'prop-types';
import { MdCheck } from 'react-icons/md';

import { Container } from './styles';

export default function SaveButton({ form }) {
  return (
    <Container>
      <button form={form} type="submit">
        <MdCheck color="#fff" size={20} />
        SALVAR
      </button>
    </Container>
  );
}

SaveButton.propTypes = {
  form: PropTypes.string.isRequired,
};
