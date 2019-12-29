import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';

import PageTitle from '~/components/PageTitle';
import BackButton from '~/components/BackButton';
import SaveButton from '~/components/SaveButton';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Content } from './styles';

export default function AddStudents() {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),
    age: Yup.number()
      .integer('Idade inválida')
      .min(1, 'Idade inválida')
      .required('A idade é obrigatória'),
    weight: Yup.number('Peso inválido')
      .min(1, 'Peso inválido')
      .required('O peso é obrigatório'),
    height: Yup.number('Altura inválida').required('A altura é obrigatória'),
  });

  async function handleSubmit(data) {
    try {
      await api.post('/students', data);
      toast.success('Aluno cadastrado com sucesso');
      history.push('/students');
    } catch (err) {
      toast.error('Houve um erro ao cadastrar o aluno, verifique os dados');
    }
  }

  return (
    <Container>
      <PageTitle title="Cadastro de aluno">
        <>
          <BackButton />
          <SaveButton form="addForm" />
        </>
      </PageTitle>

      <Content>
        <Form schema={schema} id="addForm" onSubmit={handleSubmit}>
          <label htmlFor="name">NOME COMPLETO</label>
          <Input name="name" placeholder="John Doe" />

          <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
          <Input type="email" name="email" placeholder="exemplo@email.com" />

          <div>
            <div>
              <label htmlFor="age">IDADE</label>
              <Input type="number" name="age" />
            </div>

            <div>
              <label htmlFor="weight">PESO (em kg)</label>
              <Input type="number" name="weight" />
            </div>

            <div>
              <label htmlFor="height">ALTURA</label>
              <InputMask mask="9.99">{() => <Input name="height" />}</InputMask>
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
