import React, { useEffect, useState } from 'react';

import { Container, Panel, Content, HelpOrdersTable } from './styles';

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
            {helpOrders.map(helpOrder => (
              <tr key={helpOrder.id}>
                <td>{helpOrder.student.name}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleAnswering(helpOrder)}
                  >
                    responder
                  </button>
                </td>
              </tr>
            ))}
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
