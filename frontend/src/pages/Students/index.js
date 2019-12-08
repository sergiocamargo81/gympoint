import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';

import { Container, StudentsTable } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [paramStudent, setParamStudent] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get(`students/?q=${paramStudent}`);

      setStudents(response.data);
    }

    loadStudents();
  }, [paramStudent]);

  function handleSearch(e) {
    setParamStudent(e.target.value);
  }

  return (
    <Container>
      <div>
        <span>Gerenciando alunos</span>
        <button type="submit">
          <MdAdd size={20} />
          <span>Cadastrar</span>
        </button>
        <form>
          <MdSearch size={20} />
          <input
            name="studentFilter"
            onChange={handleSearch}
            type="text"
            placeholder="Buscar aluno"
          />
        </form>
      </div>
      <StudentsTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Idade</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>editar</td>
              <td>apagar</td>
            </tr>
          ))}
        </tbody>
      </StudentsTable>
    </Container>
  );
}
