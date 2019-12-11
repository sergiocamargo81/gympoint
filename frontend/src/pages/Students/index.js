import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MdAdd, MdSearch, MdChevronLeft, MdCheck } from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Link } from 'react-router-dom';

import api from '~/services/api';

import history from '~/services/history';

import Pagination from '~/components/Pagination';

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
  ConfirmUi,
} from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [studentsFilter, setStudentsFilter] = useState('');
  const [page, setPage] = useState({
    index: 1,
    total: 1,
    size: 1,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStudents() {
      const uri = `students/?nameFilter=${studentsFilter}`;

      const response = await api.get(
        `${uri}&page=${page.index}&pageSize=${page.size}`
      );

      setPage(response.data.page);
      setStudents(response.data.students);
    }

    loadStudents();
  }, [page.index, page.size, studentsFilter]);

  function handlePageChange(page) {
    setPage(page);
  }

  function handleSearch(e) {
    setPage({ ...page, index: 1 });

    setStudentsFilter(e.target.value);
  }

  function handleClickDelete() {}

  function handleDelete() {
    const options = {
      childrenElement: () => <div />,
      customUI: ({ onClose }) => {
        return (
          <ConfirmUi>
            <h1>Apagar aluno?</h1>
            <div>
              <button type="button" onClick={onClose}>
                <MdChevronLeft size={20} />
                <span>Não</span>
              </button>
              <button
                id="yes"
                type="button"
                onClick={() => {
                  handleClickDelete();
                  onClose();
                }}
              >
                <MdCheck size={20} />
                <span>Sim</span>
              </button>
            </div>
          </ConfirmUi>
        );
      },
      closeOnEscape: true,
      closeOnClickOutside: true,
      willUnmount: () => {},
      onClickOutside: () => {},
      onKeypressEscape: () => {},
    };

    confirmAlert(options);
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
            value={studentsFilter}
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
                  <ButtonDelete onClick={handleDelete}>apagar</ButtonDelete>
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
