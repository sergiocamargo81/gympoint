import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MdAdd, MdSearch, MdChevronLeft, MdCheck } from 'react-icons/md';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
  ConfirmUi,
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
                <ButtonEdit>editar</ButtonEdit>
              </TdEdit>
              <TdDelete>
                <ButtonDelete onClick={handleDelete}>apagar</ButtonDelete>
              </TdDelete>
            </tr>
          ))}
        </tbody>
      </StudentsTable>
    </Container>
  );
}
