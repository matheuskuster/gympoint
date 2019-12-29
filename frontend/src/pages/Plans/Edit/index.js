import React, { useState, useEffect, useCallback } from 'react';
import qs from 'query-string';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import CurrencyInput from 'react-currency-input';

import api from '~/services/api';
import history from '~/services/history';

import PageTitle from '~/components/PageTitle';
import SaveButton from '~/components/SaveButton';
import BackButton from '~/components/BackButton';

import { Container, Content } from './styles';

export default function EditPlan({ location }) {
  const [plan, setPlan] = useState({});
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(1);
  const [mask, setMask] = useState(1);

  const planId = qs.parse(location.search).id;

  useEffect(() => {
    async function loadPlan() {
      try {
        const response = await api.get(`/plans?id=${planId}`);
        setMask(response.data.price);
        setDuration(response.data.duration);
        setTotalPrice(response.data.duration * response.data.price);

        const data = {
          ...response.data,
          totalPrice,
        };

        setPlan(data);
      } catch (err) {
        toast.error('Não foi possível recuperar os dados deste plano.');
        history.push('/plans');
      }
    }

    loadPlan();
  }, [planId]); //eslint-disable-line

  useEffect(() => {
    setTotalPrice(duration * mask);
  }, [duration, mask]);

  const compareData = useCallback(
    data => {
      const { title } = data;

      return (
        title === plan.title &&
        duration === plan.duration &&
        mask === plan.price
      );
    },
    [duration, mask, plan]
  );

  function handleUpdate(data) {
    if (compareData(data)) {
      toast.error('Por favor, edite os dados antes de salvar');
    } else {
      data.price = mask;

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
            await api.put('/plans', { id: planId, ...data });
            toast.success('Plano atualizado com sucesso');
            history.push('/plans');
          } catch (err) {
            toast.error(
              'Houve um erro ao atualizar o plano, verifique os dados'
            );
          }
        }
      });
    }
  }

  return (
    <Container>
      <PageTitle title="Edição de plano">
        <>
          <BackButton />
          <SaveButton form="editForm" />
        </>
      </PageTitle>

      <Content>
        <Form id="editForm" initialData={plan} onSubmit={handleUpdate}>
          <label htmlFor="title">TÍTULO DO PLANO</label>
          <Input name="title" />

          <div>
            <div>
              <label htmlFor="duration">DURAÇÃO (em meses)</label>
              <Input
                type="number"
                name="duration"
                min="1"
                onChange={e => setDuration(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="price">PREÇO MENSAL</label>
              <CurrencyInput
                name="price"
                prefix="R$"
                decimalSeparator=","
                thousandSeparator="."
                onChangeEvent={(event, maskedValue, floatValue) =>
                  setMask(floatValue)
                }
                value={mask}
              />
            </div>

            <div>
              <label htmlFor="totalPrice">PREÇO TOTAL</label>
              <CurrencyInput
                name="totalPrice"
                prefix="R$"
                decimalSeparator=","
                thousandSeparator="."
                readOnly
                value={totalPrice || ''}
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

EditPlan.propTypes = {
  location: PropTypes.object.isRequired, //eslint-disable-line
};
