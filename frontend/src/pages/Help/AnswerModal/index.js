import React from 'react';
import Modal from 'react-modal';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container } from './styles';

Modal.setAppElement('#root');

export default function AnswerModal({
  isOpen,
  order,
  onSubmit,
  onRequestClose,
}) {
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: '30px',
      width: '450px',
      outline: 'none',
      borderRadius: '4px',
      transform: 'translate(-50%, -50%)',
    },
  };

  const schema = Yup.object().shape({
    answer: Yup.string().required('Resposta obrigatória.'),
  });

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      contentLabel="Responder Aluno"
      onRequestClose={onRequestClose}
    >
      <Container>
        <Form onSubmit={onSubmit} schema={schema}>
          <label htmlFor="ask">PERGUNTA DO ALUNO</label>
          <p>{order && order.question}</p>
          <label htmlFor="answer">SUA RESPOSTA</label>
          <Input name="answer" multiline rows="5" />
          <button type="submit">Responder aluno</button>
        </Form>
      </Container>
    </Modal>
  );
}
