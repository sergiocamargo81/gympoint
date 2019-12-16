import React, { useState, useEffect } from 'react';

import { MdAdd, MdCheck } from 'react-icons/md';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import history from '~/services/history';

import Pagination from '~/components/Pagination';

import Confirm from '~/components/Confirm';

import { Container, Panel, Content, MembershipsTable } from './styles';

function formatDate(date) {
  const dateParsed = parseISO(date);
  return format(dateParsed, "d 'de' MMMM 'de' yyyy", { locale: pt });
}

export default function Memberships() {
  const [memberships, setMemberships] = useState([]);

  const [page, setPage] = useState({
    index: 1,
    total: 1,
    size: 10,
  });

  const [deleted, setDeleted] = useState({});

  const [confirm, setConfirm] = useState({ isOpen: false, id: 0 });

  useEffect(() => {
    async function loadMemberships() {
      const uri = `memberships`;

      const response = await api.get(
        `${uri}?page=${page.index}&pageSize=${page.size}`
      );

      setPage(response.data.page);

      const formattedMemberships = response.data.memberships.map(m => ({
        ...m,
        startDateFormatted: formatDate(m.start_date),
        endDateFormatted: formatDate(m.end_date),
      }));

      setMemberships(formattedMemberships);
    }

    loadMemberships();
  }, [page.index, page.size, deleted]);

  function handlePageChange(p) {
    setPage(p);
  }

  function handleDelete(id) {
    setConfirm({ isOpen: true, id });
  }

  async function deleteMembership(id) {
    if (id > 0) {
      const response = await api.delete(`memberships/${id}`);

      setDeleted(response);
    }
  }

  function handleEdit(membership) {
    history.push({
      pathname: `membership`,
      state: {
        membership,
      },
    });
  }

  function handleCreate() {
    history.push({
      pathname: 'membership',
      state: {
        membership: {
          id: null,
          startDate: '',
          endDate: '',
          active: false,
        },
      },
    });
  }

  return (
    <Container>
      <Panel>
        <span>Gerenciando matrículas</span>
        <button type="button" onClick={handleCreate}>
          <MdAdd size={20} />
          <span>Cadastrar</span>
        </button>
      </Panel>
      <Content>
        <MembershipsTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th> </th>
              <th>INÍCIO</th>
              <th> </th>
              <th>TÉRMINO</th>
              <th> </th>
              <th>ATIVA</th>
              <th> </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {memberships.map(m => (
              <tr key={m.id}>
                <td>{m.student.name}</td>
                <td>{m.plan.title}</td>
                <td> </td>
                <td>{m.startDateFormatted}</td>
                <td> </td>
                <td>{m.endDateFormatted}</td>
                <td> </td>
                <td>
                  <MdCheck size={20} className={m.active ? 'active' : ''} />
                </td>
                <td> </td>
                <td>
                  <button type="button" onClick={() => handleEdit(m)}>
                    editar
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => handleDelete(m.id)}>
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </MembershipsTable>
        <Pagination page={page} onChange={handlePageChange} />
      </Content>
      <Confirm
        isOpen={confirm.isOpen}
        question="Apagar matrícula?"
        onClose={() => setConfirm({ ...confirm, isOpen: false })}
        onConfirm={() => deleteMembership(confirm.id)}
      />
    </Container>
  );
}
