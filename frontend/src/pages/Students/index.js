import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';

import {
  Container,
  Panel,
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
      <Panel>
        <span>Gerenciando alunos</span>
        <button type="button">
          <MdAdd size={20} />
          <span>Cadastrar</span>
        </button>
        <form>
          <MdSearch size={20} />
          <input
            name="studentFilter"
            value={paramStudent}
            onChange={handleSearch}
            type="text"
            placeholder="Buscar aluno"
          />
        </form>
      </Panel>
      <StudentsTable>
        <thead>
          <tr>
            <ThName>Nome</ThName>
            <ThEmail>E-mail</ThEmail>
            <ThAge>Idade</ThAge>
            <ThBlank />
            <thEdit />
            <thDelete />
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
                <ButtonEdit>editar</ButtonEdit>
              </TdEdit>
              <TdDelete>
                <ButtonDelete OnClick={() => {}}>apagar</ButtonDelete>
              </TdDelete>
            </tr>
          ))}
        </tbody>
      </StudentsTable>
    </Container>
  );
}
