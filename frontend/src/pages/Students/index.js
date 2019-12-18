import React, { useState, useEffect } from 'react';

import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';

import history from '~/services/history';

import Pagination from '~/components/Pagination';

import Confirm from '~/components/Confirm';

import {
  Container,
  Panel,
  Content,
  StudentsTable,
  StudentData,
  NoData,
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

  const [confirm, setConfirm] = useState({ isOpen: false, id: 0 });

  useEffect(() => {
    async function loadStudents() {
      const uri = `students/?nameFilter=${nameFilter}`;

      let response = await api.get(
        `${uri}&page=${page.index}&pageSize=${page.size}`
      );

      if (
        response.data.students.length === 0 &&
        response.data.page.index > response.data.page.total &&
        response.data.page.total > 0
      ) {
        response = await api.get(
          `${uri}&page=${page.total}&pageSize=${page.size}`
        );
      }

      setPage(response.data.page);
      setStudents(response.data.students);
    }

    loadStudents();
  }, [nameFilter, page.index, page.size, deleted, page.total]);

  function handlePageChange(p) {
    setPage(p);
  }

  function handleSearch(e) {
    setPage({ ...page, index: 1 });

    setNameFilter(e.target.value);
  }

  function handleDelete(id) {
    setConfirm({ isOpen: true, id });
  }

  async function deleteStudent(id) {
    if (id > 0) {
      const response = await api.delete(`students/${id}`);

      setDeleted(response);
    }
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
        <button type="button" onClick={handleCreate}>
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
              <th>Nome</th>
              <th>E-mail</th>
              <th>Idade</th>
              <th> </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map(s => (
                <StudentData key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.age}</td>
                  <td />
                  <td>
                    <button type="button" onClick={() => handleEdit(s)}>
                      editar
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDelete(s.id)}>
                      apagar
                    </button>
                  </td>
                </StudentData>
              ))
            ) : (
              <NoData>
                <td colSpan="6">Nenhum aluno encontrado</td>
              </NoData>
            )}
          </tbody>
        </StudentsTable>
        <Pagination page={page} onChange={handlePageChange} />
      </Content>
      <Confirm
        isOpen={confirm.isOpen}
        question="Apagar Aluno?"
        onClose={() => setConfirm({ ...confirm, isOpen: false })}
        onConfirm={() => deleteStudent(confirm.id)}
      />
    </Container>
  );
}
