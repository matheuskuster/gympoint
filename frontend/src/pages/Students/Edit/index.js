import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import qs from 'query-string';
import * as Yup from 'yup';

import PageTitle from '~/components/PageTitle';
import SaveButton from '~/components/SaveButton';
import BackButton from '~/components/BackButton';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Content } from './styles';

export default function EditStudent({ location }) {
  const [student, setStudent] = useState(null);
  const [mask, setMask] = useState([]);

  const studentId = qs.parse(location.search).id;

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
    height: Yup.number('Altura inválida')
      .min(1, 'Altura inválida')
      .required('A Altura é obrigatória'),
  });

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await api.get(`/students?id=${studentId}`);

        setStudent(response.data);
        setMask(response.data.height);
      } catch (err) {
        toast.error('Não foi possível recuperar os dados deste aluno.');
        history.push('/students');
      }
    }

    loadStudent();
  }, [studentId]);

  const compareData = useCallback(
    data => {
      const { name, age, height, weight, email } = data;

      return (
        name === student.name &&
        age === student.age &&
        height === student.height &&
        weight === student.weight &&
        email === student.email
      );
    },
    [student]
  );

  async function handleUpdate(data) {
    if (compareData(data)) {
      toast.error('Por favor, edite os dados antes de salvar.');
    } else {
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Não será possível retornar aos dados anteriores!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, salvar',
        confirmButtonColor: '#EE4D64',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then(async result => {
        if (result.value) {
          try {
            await api.put('/students', { id: studentId, ...data });
            toast.success('Aluno atualizado com sucesso');
            history.push('/students');
          } catch (err) {
            toast.error(
              'Houve um erro ao atualizar o aluno, verifique os dados'
            );
          }
        }
      });
    }
  }

  return (
    <Container>
      <PageTitle title="Edição de aluno">
        <>
          <BackButton />
          <SaveButton form="editForm" />
        </>
      </PageTitle>

      <Content>
        <Form
          schema={schema}
          id="editForm"
          onSubmit={handleUpdate}
          initialData={student}
        >
          <label htmlFor="name">NOME COMPLETO</label>
          <Input name="name" placeholder="John Doe" />

          <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
          <Input type="email" name="email" placeholder="John Doe" />

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
              <label htmlFor="height">Altura</label>
              <InputMask
                mask="9.99"
                value={mask}
                onChange={e => setMask(e.targetvalue)}
              >
                {() => <Input name="height" />}
              </InputMask>
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

EditStudent.propTypes = {
  location: PropTypes.object.isRequired, //eslint-disable-line
};
