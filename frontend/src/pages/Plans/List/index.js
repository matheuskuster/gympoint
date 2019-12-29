import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import api from '~/services/api';
import { formatPrice, formatDuration } from '~/util/format';

import Pagination from '~/components/Pagination';
import NotFound from '~/components/NotFound';
import PageTitle from '~/components/PageTitle';
import SubscribeButton from '~/components/SubscribeButton';
import { Table, Td, Th } from '~/components/Table';

import { Container, Content } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [resultNumber, setResultNumber] = useState(0);
  const [page, setPage] = useState(1);

  async function loadPlans() {
    try {
      const response = await api.get('/plans', {
        params: { page: page - 1 },
      });

      setResultNumber(response.data.count);
      setNumberOfPages(response.data.maxPage);

      const data = response.data.rows.map(plan => ({
        ...plan,
        formattedPrice: formatPrice(plan.price),
        formattedDuration: formatDuration(plan.duration),
      }));

      setPlans(data);
    } catch (err) {
      toast.error('Ocorreu um erro interno, por favor verifique sua conexão');
    }
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
          await api.delete('/plans', {
            data: {
              id,
            },
          });
          toast.success('Plano apagado com sucesso!');
          setPage(1);
          loadPlans();
        } catch (err) {
          toast.error('Não foi possível apagar o plano.');
        }
      }
    });
  }

  useEffect(() => {
    loadPlans();
  }, [page]); // eslint-disable-line

  const contentNumber = useMemo(() => plans.length, [plans]);

  return (
    <Container>
      <PageTitle
        contentNumber={contentNumber}
        resultNumber={resultNumber}
        title="Gerenciando planos"
      >
        <SubscribeButton />
      </PageTitle>

      {plans && plans.length ? (
        <>
          <Content>
            <Table small>
              <>
                <thead>
                  <tr>
                    <Th position="left">TÍTULO</Th>
                    <Th>DURAÇÃO</Th>
                    <Th>VALOR p/ MÊS</Th>
                    <Th position="right" />
                  </tr>
                </thead>

                <tbody>
                  {plans.map(plan => (
                    <tr key={plan.id}>
                      <Td position="left">{plan.title}</Td>
                      <Td>{plan.formattedDuration}</Td>
                      <Td>{plan.formattedPrice}</Td>
                      <Td position="right">
                        <>
                          <Link to={`/plans/edit?id=${plan.id}`}>editar</Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(plan.id)}
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
        <NotFound text="Não há planos cadastrados!" />
      )}
    </Container>
  );
}
