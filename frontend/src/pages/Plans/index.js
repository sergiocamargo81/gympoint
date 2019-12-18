import React, { useState, useEffect } from 'react';

import { MdAdd } from 'react-icons/md';

import api from '~/services/api';

import history from '~/services/history';

import Pagination from '~/components/Pagination';

import Confirm from '~/components/Confirm';

import {
  Container,
  Panel,
  Content,
  PlansTable,
  PlanData,
  NoData,
} from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  const [page, setPage] = useState({
    index: 1,
    total: 1,
    size: 10,
  });

  const [deleted, setDeleted] = useState({});

  const [confirm, setConfirm] = useState({ isOpen: false, id: 0 });

  useEffect(() => {
    async function loadPlans() {
      const uri = `plans`;

      let response = await api.get(
        `${uri}?page=${page.index}&pageSize=${page.size}`
      );

      if (
        response.data.plans.length === 0 &&
        response.data.page.index > response.data.page.total
      ) {
        response = await api.get(
          `${uri}?page=${page.total}&pageSize=${page.size}`
        );
      }

      setPage(response.data.page);

      const formattedPlans = response.data.plans.map(p => ({
        ...p,
        priceFormatted: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(p.price),
        durationFormatted: p.duration === 1 ? '1 mês' : `${p.duration} meses`,
      }));

      setPlans(formattedPlans);
    }

    loadPlans();
  }, [page.index, page.size, deleted, page.total]);

  function handlePageChange(p) {
    setPage(p);
  }

  function handleDelete(id) {
    setConfirm({ isOpen: true, id });
  }

  async function deletePlan(id) {
    if (id > 0) {
      const response = await api.delete(`plans/${id}`);

      setDeleted(response);
    }
  }

  function handleEdit(plan) {
    history.push({
      pathname: `plan`,
      state: {
        plan,
      },
    });
  }

  function handleCreate() {
    history.push({
      pathname: 'plan',
      state: {
        plan: {
          id: null,
          title: '',
          duration: 0,
          price: '0',
        },
      },
    });
  }

  return (
    <Container>
      <Panel>
        <span>Gerenciando planos</span>
        <button type="button" onClick={handleCreate}>
          <MdAdd size={20} />
          <span>Cadastrar</span>
        </button>
      </Panel>
      <Content>
        <PlansTable>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th> </th>
              <th>VALOR p/ MÊS</th>
              <th> </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {plans.length > 0 ? (
              plans.map(p => (
                <PlanData key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.durationFormatted}</td>
                  <td />
                  <td>{p.priceFormatted}</td>
                  <td />
                  <td>
                    <button type="button" onClick={() => handleEdit(p)}>
                      editar
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDelete(p.id)}>
                      apagar
                    </button>
                  </td>
                </PlanData>
              ))
            ) : (
              <NoData>
                <td colSpan="7">Nenhum plano encontrado</td>
              </NoData>
            )}
          </tbody>
        </PlansTable>
        <Pagination page={page} onChange={handlePageChange} />
      </Content>
      <Confirm
        isOpen={confirm.isOpen}
        question="Apagar Plano?"
        onClose={() => setConfirm({ ...confirm, isOpen: false })}
        onConfirm={() => deletePlan(confirm.id)}
      />
    </Container>
  );
}
