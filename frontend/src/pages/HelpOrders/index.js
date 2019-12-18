import React, { useEffect, useState } from 'react';

import {
  Container,
  Panel,
  Content,
  HelpOrdersTable,
  HelpOrderData,
  NoData,
} from './styles';

import Answering from './Answering';

import Pagination from '~/components/Pagination';

import api from '~/services/api';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);

  const [page, setPage] = useState({
    index: 1,
    total: 1,
    size: 10,
  });

  const [answering, setAnswering] = useState({
    isOpen: false,
    helpOrder: { question: '', answer: '' },
  });

  useEffect(() => {
    async function loadHelpOrders() {
      const uri = `help-orders/unanswer`;

      let response = await api.get(
        `${uri}?page=${page.index}&pageSize=${page.size}`
      );

      if (
        response.data.help_orders.length === 0 &&
        response.data.page.index > response.data.page.total &&
        response.data.page.total > 0
      ) {
        response = await api.get(
          `${uri}?page=${page.total}&pageSize=${page.size}`
        );
      }

      setPage(response.data.page);
      setHelpOrders(response.data.help_orders);
    }

    loadHelpOrders();
  }, [page.index, page.size, page.total]);

  function handlePageChange(p) {
    setPage(p);
  }

  function handleAnswering(helpOrder) {
    setAnswering({
      isOpen: true,
      helpOrder,
    });
  }

  function removeHelpOrder(helpOrder) {
    const filteredHelpOrders = helpOrders.filter(
      item => item.id !== helpOrder.id
    );

    setHelpOrders(filteredHelpOrders);

    setAnswering({
      isOpen: false,
      helpOrder: { question: '', answer: '' },
    });
  }

  return (
    <Container>
      <Panel>
        <span>Pedidos de auxílio</span>
      </Panel>
      <Content>
        <HelpOrdersTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.length > 0 ? (
              helpOrders.map(helpOrder => (
                <HelpOrderData key={helpOrder.id}>
                  <td>{helpOrder.student.name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleAnswering(helpOrder)}
                    >
                      responder
                    </button>
                  </td>
                </HelpOrderData>
              ))
            ) : (
              <NoData>
                <td colSpan="2">Nenhum pedido de auxílio sem resposta</td>
              </NoData>
            )}
          </tbody>
        </HelpOrdersTable>
        <Pagination page={page} onChange={handlePageChange} />
      </Content>
      <Answering
        isOpen={answering.isOpen}
        helpOrder={answering.helpOrder}
        onAnswer={removeHelpOrder}
      />
    </Container>
  );
}
