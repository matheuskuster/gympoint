/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import { MdDateRange } from 'react-icons/md';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input';
import { addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';

import 'react-datepicker/dist/react-datepicker.css';

import ReactSelect from '~/components/ReactSelect';

import api from '~/services/api';
import history from '~/services/history';

import PageTitle from '~/components/PageTitle';
import SaveButton from '~/components/SaveButton';
import BackButton from '~/components/BackButton';

import { Container, Content } from './styles';

registerLocale('pt-BR', ptBR);

export default function AddEnrollment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const [finalDate, setFinalDate] = useState(null);

  const loadStudents = async inputValue => {
    const response = await api.get(`/students?q=${inputValue}`);

    return response.data.rows;
  };

  const loadPlans = async inputValue => {
    const response = await api.get(`/plans`);

    return response.data.rows.filter(plan =>
      plan.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseStudents = async inputValue => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(loadStudents(inputValue));
      }, 500);
    });
  };

  const promisePlans = async inputValue => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(loadPlans(inputValue));
      }, 500);
    });
  };

  useEffect(() => {
    if (selectedPlan && selectedDate) {
      const date = addMonths(selectedDate, selectedPlan.duration);
      const price = selectedPlan.duration * selectedPlan.price;
      setFinalDate(date);
      setFinalPrice(price);
    }
  }, [selectedPlan, selectedDate]);

  async function handleSubmit() {
    if (selectedStudent && selectedDate && selectedPlan) {
      const data = {
        student_id: parseInt(selectedStudent.id),
        plan_id: parseInt(selectedPlan.id),
        start_date: selectedDate,
      };

      try {
        await api.post('/registrations', data);
        toast.success('Matricula efetuada com sucesso.');
        history.push('/enrollments');
      } catch (err) {
        toast.error('O aluno já está matriculado.');
      }
    } else {
      toast.error('Houve um erro ao matricular o aluno, verifique os dados.');
    }
  }

  return (
    <Container>
      <PageTitle title="Cadastro de matrícula">
        <>
          <BackButton />
          <SaveButton form="addForm" />
        </>
      </PageTitle>

      <Content>
        <Form id="addForm" onSubmit={handleSubmit}>
          <ReactSelect
            cacheOptions
            defaultOptions
            placeholder="Buscar aluno"
            label="ALUNO"
            name="student"
            multiple={false}
            loadOptions={promiseStudents}
            onChange={student => {
              setSelectedStudent(student);
            }}
            getOptionLabel={option => option.name}
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
                placeholder="Selecione o plano"
                loadOptions={promisePlans}
                onChange={plan => {
                  setSelectedPlan(plan);
                }}
                getOptionLabel={option => option.title}
              />
            </div>

            <div>
              <label htmlFor="duration">DATA DE INÍCIO</label>
              <div className="dateGroup">
                <MdDateRange className="date" size={20} color="#ccc" />
                <ReactDatePicker
                  name="duration"
                  minDate={new Date()}
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecione a data"
                  locale="pt-BR"
                  customInput={<InputMask mask="99/99/9999" />}
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
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label htmlFor="totalPrice">VALOR FINAL</label>
              <CurrencyInput
                name="totalPrice"
                prefix="R$"
                readOnly
                decimalSeparator=","
                thousandSeparator="."
                value={finalPrice || ''}
              />
            </div>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
