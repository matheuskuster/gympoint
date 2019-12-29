import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Pagination from '~/components/Pagination';
import NotFound from '~/components/NotFound';
import PageTitle from '~/components/PageTitle';

import api from '~/services/api';

import { Container, Content } from './styles';
import AnswerModal from './AnswerModal';

export default function Help() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [answeringOrder, setAnsweringOrder] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [page, setPage] = useState(1);

  async function loadHelpOrders() {
    const response = await api.get('/help-orders', {
      params: { page: page - 1 },
    });

    setNumberOfPages(response.data.maxPage);

    const data = response.data.rows.filter(help => !help.answer);

    setHelpOrders(data);
  }

  function openModal(index) {
    setAnsweringOrder(helpOrders[index]);
    setModalIsOpen(true);
  }

  async function onSubmit(data) {
    try {
      await api.post(`/help-orders/${answeringOrder.id}/answer`, data);
      toast.success('Pedido de auxílio respondido com sucesso!');
      setModalIsOpen(false);
      loadHelpOrders();
    } catch (err) {
      toast.error('Não foi possível responder o pedido de auxílio.');
    }
  }

  useEffect(() => {
    loadHelpOrders();
  }, [page]); //eslint-disable-line

  return (
    <>
      <AnswerModal
        isOpen={modalIsOpen}
        order={answeringOrder}
        onRequestClose={() => setModalIsOpen(false)}
        onSubmit={onSubmit}
      />
      <Container>
        <PageTitle title="Pedidos de auxílio">
          <></>
        </PageTitle>

        {helpOrders && helpOrders.length ? (
          <>
            <Content>
              <label>ALUNO</label>

              <ul>
                {helpOrders &&
                  helpOrders.map((helpOrder, index) => (
                    <li key={helpOrder.id}>
                      <p>{helpOrder.student.name}</p>
                      <button type="button" onClick={() => openModal(index)}>
                        responder
                      </button>
                    </li>
                  ))}
              </ul>
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
          <NotFound text="Todos os pedidos foram respondidos!" happy />
        )}
      </Container>
    </>
  );
}
