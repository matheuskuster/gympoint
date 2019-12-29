/* eslint-disable radix */
import React, { useState, useEffect, useCallback } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { parseISO, addMonths, format } from 'date-fns';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import qs from 'query-string';
import CurrencyInput from 'react-currency-input';
import InputMask from 'react-input-mask';

import { Form, Input } from '@rocketseat/unform';
import { MdDateRange } from 'react-icons/md';
import { ptBR } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

import ReactSelect from '~/components/ReactSelect';
import PageTitle from '~/components/PageTitle';
import SaveButon from '~/components/SaveButton';
import BackButton from '~/components/BackButton';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

registerLocale('pt-BR', ptBR);

export default function EditEnrollments({ location }) {
  const [plan, setPlan] = useState(null);
  const [student, setStudent] = useState(null);
  const [initialDate, setInitialDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);
  const [enrollment, setEnrollment] = useState(null);

  const enrollmentId = qs.parse(location.search).id;

  useEffect(() => {
    async function loadEnrollment() {
      try {
        const response = await api.get(`/registrations?id=${enrollmentId}`);
        setPlan(response.data.plan);
        setStudent(response.data.student);
        setInitialDate(parseISO(response.data.start_date));
        setFinalDate(parseISO(response.data.end_date));
        setFinalPrice(response.data.price);
        setEnrollment(response.data);
      } catch (err) {
        toast.error('Não foi possível recuperar os dados desta matrícula.');
        history.push('/enrollments');
      }
    }

    loadEnrollment();
  }, [enrollmentId]); //eslint-disable-line

  const loadPlans = async inputValue => {
    const response = await api.get(`/plans`);

    return response.data.filter(i =>
      i.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promisePlans = async inputValue => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(loadPlans(inputValue));
      }, 500);
    });
  };

  useEffect(() => {
    if (plan && initialDate) {
      const date = addMonths(initialDate, plan.duration);
      const price = plan.duration * plan.price;
      setFinalDate(date);
      setFinalPrice(price);
    }
  }, [plan, initialDate]);

  const compareData = useCallback(
    data => {
      const { plan_id, start_date } = data;

      return (
        plan_id === enrollment.plan.id &&
        format(new Date(start_date), 'dd/MM/yyyy') ===
          format(parseISO(enrollment.start_date), 'dd/MM/yyyy')
      );
    },
    [plan, initialDate, enrollment] //eslint-disable-line
  );

  async function handleSubmit() {
    if (student && initialDate && plan) {
      const data = {
        id: enrollmentId,
        student_id: parseInt(student.id),
        plan_id: parseInt(plan.id),
        start_date: initialDate,
      };

      if (compareData(data)) {
        toast.error('Altere os dados antes de salvar.');
      } else {
        try {
          await api.put('/registrations', data);
          toast.success('Matrícula atualizada com sucesso.');
          history.push('/enrollments');
        } catch (err) {
          toast.error(
            'Houve um erro ao atualizar a matrícula, verifique os dados.'
          );
        }
      }
    } else {
      toast.error(
        'Houve um erro ao atualizar a matrícula, verifique os dados.'
      );
    }
  }

  return (
    <Container>
      <PageTitle title="Edição de matrículas">
        <>
          <BackButton />
          <SaveButon form="editForm" />
        </>
      </PageTitle>

      <Content>
        <Form id="editForm" onSubmit={handleSubmit}>
          <label htmlFor="student">ALUNO</label>
          <Input
            name="student"
            readOnly
            value={(student && student.name) || ''}
          />

          <div className="inputBox">
            <div>
              <ReactSelect
                cacheOptions
                defaultOptions
                small
                label="PLANO"
                name="plan"
                multiple={false}
                placeholder="Carregando..."
                getOptionLabel={option => option.title}
                loadOptions={promisePlans}
                onChange={value => {
                  setPlan(value);
                }}
                value={plan}
              />
            </div>

            <div>
              <label htmlFor="duration">DATA DE INÍCIO</label>
              <div className="dateGroup">
                <MdDateRange className="date" size={20} color="#ccc" />
                <ReactDatePicker
                  name="duration"
                  dateFormat="dd/MM/yyyy"
                  onChange={date => setInitialDate(date)}
                  selected={initialDate}
                  placeholderText="Selecione a data"
                  locale="pt-BR"
                />
              </div>
            </div>

            <div>
              <label htmlFor="duration">DATA DE TÉRMINO</label>
              <div className="dateGroup">
                <MdDateRange className="date" size={20} color="#ccc" disabled />
                <ReactDatePicker
                  name="duration"
                  selected={finalDate}
                  dateFormat="dd/MM/yyyy"
                  readOnly
                  customInput={<InputMask mask="99/99/9999" />}
                />
              </div>
            </div>

            <div>
              <label htmlFor="totalPrice">VALOR FINAL</label>
              <CurrencyInput
                name="totalPrice"
                decimalSeparator=","
                thousandSeparator="."
                prefix="R$"
                readOnly
                value={finalPrice || ''}
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

EditEnrollments.propTypes = {
  location: PropTypes.object.isRequired, //eslint-disable-line
};
