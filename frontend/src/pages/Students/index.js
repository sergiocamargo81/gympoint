import React, { useState, useEffect } from 'react';

import { MdAdd, MdSearch } from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import api from '~/services/api';

import history from '~/services/history';

import Pagination from '~/components/Pagination';

import Confirm from '~/components/Confirm';

import {
  Container,
  Panel,
  Content,
  StudentsTable,
  ThName,
  ThEmail,
  ThAge,
  ThBlank,
  ThEdit,
  ThDelete,
  TdAge,
  TdEdit,
  TdDelete,
  ButtonEdit,
  ButtonDelete,
} from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [page, setPage] = useState({
    index: 1,
    total: 1,
    size: 10,
  });
  const [deleted, setDeleted] = useState({});

  useEffect(() => {
    async function loadStudents() {
      const uri = `students/?nameFilter=${nameFilter}`;

      const response = await api.get(
        `${uri}&page=${page.index}&pageSize=${page.size}`
      );

      setPage(response.data.page);
      setStudents(response.data.students);
    }

    loadStudents();
  }, [nameFilter, page.index, page.size, deleted]);

  function handlePageChange(p) {
    setPage(p);
  }

  function handleSearch(e) {
    setPage({ ...page, index: 1 });

    setNameFilter(e.target.value);
  }

  async function handleClickDelete(id) {
    if (id) {
      const response = await api.delete(`students/${id}`);

      setDeleted(response);
    }
  }

  function handleDelete(id) {
    confirmAlert({
      childrenElement: () => <div />,
      customUI: parent => (
        <Confirm
          question="Apagar aluno?"
          onConfirm={() => handleClickDelete(id)}
          onClose={parent.onClose}
        />
      ),
      closeOnEscape: true,
      closeOnClickOutside: true,
      willUnmount: () => {},
      onClickOutside: () => {},
      onKeypressEscape: () => {},
    });
  }

  function handleEdit(student) {
    history.push({
      pathname: `student`,
      state: {
        student,
      },
    });
  }

  function handleCreate() {
    history.push({
      pathname: 'student',
      state: {
        student: {
          id: null,
          name: '',
          email: '',
          age: '',
          weight: '',
          height: '',
        },
      },
    });
  }

  return (
    <Container>
      <Panel>
        <span>Gerenciando alunos</span>
        <button type="button" onClick={() => handleCreate()}>
          <MdAdd size={20} />
          <span>Cadastrar</span>
        </button>
        <form>
          <MdSearch size={20} />
          <input
            name="studentFilter"
            value={nameFilter}
            onChange={handleSearch}
            type="text"
            placeholder="Buscar aluno"
          />
        </form>
      </Panel>
      <Content>
        <StudentsTable>
          <thead>
            <tr>
              <ThName>Nome</ThName>
              <ThEmail>E-mail</ThEmail>
              <ThAge>Idade</ThAge>
              <ThBlank />
              <ThEdit />
              <ThDelete />
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <TdAge>{s.age}</TdAge>
                <td />
                <TdEdit>
                  <ButtonEdit onClick={() => handleEdit(s)}>editar</ButtonEdit>
                </TdEdit>
                <TdDelete>
                  <ButtonDelete onClick={() => handleDelete(s.id)}>
                    apagar
                  </ButtonDelete>
                </TdDelete>
              </tr>
            ))}
          </tbody>
        </StudentsTable>
        <Pagination page={page} onChange={handlePageChange} />
      </Content>
    </Container>
  );
}
