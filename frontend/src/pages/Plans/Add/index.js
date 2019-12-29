import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import CurrencyInput from 'react-currency-input';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import PageTitle from '~/components/PageTitle';
import BackButton from '~/components/BackButton';
import SaveButton from '~/components/SaveButton';

import { Container, Content } from './styles';

export default function AddPlan() {
  const [duration, setDuration] = useState(1);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const schema = Yup.object().shape({
    title: Yup.string().required('Título obrigatório'),
    duration: Yup.number()
      .integer('Duração inválida')
      .min(1, 'Duração inválida')
      .required('A duração é obrigatória'),
  });

  async function handleSubmit(data) {
    try {
      if (!price || price === 0) throw Error();

      data.price = price;
      await api.post('/plans', data);
      toast.success('Plano cadastrado com sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Houve um erro ao cadastrar o plano, verifique os dados');
    }
  }

  useEffect(() => {
    setTotalPrice(duration * price);
  }, [duration, price]);

  return (
    <Container>
      <PageTitle title="Cadastro de planos">
        <>
          <BackButton />
          <SaveButton form="addForm" />
        </>
      </PageTitle>

      <Content>
        <Form schema={schema} id="addForm" onSubmit={handleSubmit}>
          <label htmlFor="title">TÍTULO DO PLANO</label>
          <Input name="title" />

          <div>
            <div>
              <label htmlFor="duration">DURAÇÃO (em meses)</label>
              <Input
                type="number"
                name="duration"
                min="1"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="price">PREÇO MENSAL</label>
              <CurrencyInput
                prefix="R$"
                decimalSeparator=","
                thousandSeparator="."
                onChangeEvent={(e, maskedValue, floatValue) =>
                  setPrice(floatValue)
                }
                value={price}
                name="price"
              />
            </div>

            <div>
              <label htmlFor="totalPrice">PREÇO TOTAL</label>
              <CurrencyInput
                name="totalPrice"
                readOnly
                prefix="R$"
                value={totalPrice || ''}
                decimalSeparator=","
                thousandSeparator="."
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
