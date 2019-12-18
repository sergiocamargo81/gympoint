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

import api from '~/services/api';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [answering, setAnswering] = useState({
    isOpen: false,
    helpOrder: { question: '', answer: '' },
  });

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('help-orders/unanswer');

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, []);

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
      </Content>
      <Answering
        isOpen={answering.isOpen}
        helpOrder={answering.helpOrder}
        onAnswer={removeHelpOrder}
      />
    </Container>
  );
}
