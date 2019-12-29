import React, { useEffect, useState, useMemo } from 'react';
import { MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import api from '~/services/api';

import Pagination from '~/components/Pagination';
import NotFound from '~/components/NotFound';
import PageTitle from '~/components/PageTitle';
import SubscribeButton from '~/components/SubscribeButton';
import { Table, Td, Th } from '~/components/Table';

import { Container, Content } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [resultNumber, setResultNumber] = useState(0);
  const [page, setPage] = useState(1);

  async function loadStudents() {
    try {
      const response = await api.get(`/students`, {
        params: {
          q: studentName,
          page: page - 1,
        },
      });

      setResultNumber(response.data.count);
      setStudents(response.data.rows);
      setNumberOfPages(
        studentName !== '' ? response.data.maxPage : response.data.maxPage + 1
      );
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
          await api.delete('/students', {
            data: {
              id,
            },
          });
          toast.success('Estudante apagado com sucesso!');
          setPage(1);
          loadStudents();
        } catch (err) {
          toast.error('Não foi possível apagar o estudante.');
        }
      }
    });
  }

  useEffect(() => {
    loadStudents();
  }, [studentName, page]); //eslint-disable-line

  const contentNumber = useMemo(() => students.length, [students]);

  return (
    <Container>
      <PageTitle
        contentNumber={contentNumber}
        resultNumber={resultNumber}
        title="Gerenciando alunos"
      >
        <>
          <SubscribeButton />

          <label htmlFor="search">
            <MdSearch size={20} color="#999" />
            <input
              onChange={e => {
                setPage(1);
                setStudentName(e.target.value);
              }}
              id="search"
              type="text"
              placeholder="Buscar aluno"
            />
          </label>
        </>
      </PageTitle>

      {students.length ? (
        <>
          <Content>
            <Table>
              <>
                <thead>
                  <tr>
                    <Th position="left">NOME</Th>
                    <Th position="left">E-MAIL</Th>
                    <Th>IDADE</Th>
                    <Th position="right" />
                  </tr>
                </thead>

                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <Td position="left">{student.name}</Td>
                      <Td position="left">{student.email}</Td>
                      <Td>{String(student.age)}</Td>
                      <Td position="right">
                        <>
                          <Link to={`/students/edit?id=${student.id}`}>
                            editar
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(student.id)}
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
        <NotFound text="Não há alunos a serem listados!" />
      )}
    </Container>
  );
}
