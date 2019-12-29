import React, { useEffect, useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

import ptBR from 'date-fns/locale/pt-BR';

import Pagination from '~/components/Pagination';
import NotFound from '~/components/NotFound';
import PageTitle from '~/components/PageTitle';
import SubscribeButton from '~/components/SubscribeButton';
import { Table, Td, Th } from '~/components/Table';

import api from '~/services/api';

import { Container, Content } from './styles';

export default function List() {
  const [enrollments, setEnrollments] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [resultNumber, setResultNumber] = useState(0);
  const [page, setPage] = useState(1);

  async function loadEnrollments() {
    const response = await api.get('/registrations', {
      params: { page: page - 1 },
    });

    setResultNumber(response.data.count);
    setNumberOfPages(response.data.maxPage);

    const data = response.data.rows.map(enrollment => ({
      id: enrollment.id,
      studentName: enrollment.student.name,
      plan: enrollment.plan.title,
      formattedInitialDate: format(
        parseISO(enrollment.start_date),
        "dd 'de' MMMM 'de' yyyy",
        { locale: ptBR }
      ),
      formattedEndDate: format(
        parseISO(enrollment.end_date),
        "dd 'de' MMMM 'de' yyyy",
        { locale: ptBR }
      ),
      active: enrollment.active,
    }));

    setEnrollments(data);
  }

  function handleDelete(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Não será possível reverter essa ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apagar',
      confirmButtonColor: '#EE4D64',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(async result => {
      if (result.value) {
        try {
          await api.delete('/registrations', {
            data: {
              id,
            },
          });
          toast.success('Matrícula apagada com sucesso!');
          setPage(1);
          loadEnrollments();
        } catch (err) {
          toast.error('Não foi possível apagar a matrícula.');
        }
      }
    });
  }

  useEffect(() => {
    loadEnrollments();
  }, [page]); //eslint-disable-line

  const contentNumber = useMemo(() => enrollments.length, [enrollments]);

  return (
    <Container>
      <PageTitle
        contentNumber={contentNumber}
        resultNumber={resultNumber}
        title="Gerenciando matrículas"
      >
        <SubscribeButton />
      </PageTitle>

      {enrollments && enrollments.length ? (
        <>
          <Content>
            <Table>
              <>
                <thead>
                  <tr>
                    <Th position="left">ALUNO</Th>
                    <Th>PLANO</Th>
                    <Th>INÍCIO</Th>
                    <Th>TÉRMINO</Th>
                    <Th>ATIVA</Th>
                    <Th />
                  </tr>
                </thead>

                <tbody>
                  {enrollments.map(enrollment => (
                    <tr key={enrollment.id}>
                      <Td position="left">{enrollment.studentName}</Td>
                      <Td>{enrollment.plan}</Td>
                      <Td>{enrollment.formattedInitialDate}</Td>
                      <Td>{enrollment.formattedEndDate}</Td>
                      <Td>
                        <MdCheckCircle
                          size={20}
                          color={enrollment.active ? '#42cb59' : '#ddd'}
                        />
                      </Td>
                      <Td position="right">
                        <>
                          <Link to={`/enrollments/edit?id=${enrollment.id}`}>
                            editar
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(enrollment.id)}
                          >
                            apagar
                          </button>
                        </>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </>
            </Table>
          </Content>

          {numberOfPages >= 1 && (
            <Pagination
              page={page}
              numberOfPages={numberOfPages}
              setPage={setPage}
            />
          )}
        </>
      ) : (
        <NotFound text="Não há alunos matriculados!" />
      )}
    </Container>
  );
}
