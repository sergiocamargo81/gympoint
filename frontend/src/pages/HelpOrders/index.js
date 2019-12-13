import React from 'react';

import { Container, Panel, Content, HelpOrdersTable } from './styles';

export default function HelpOrders() {
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
            <tr>
              <td>Sérgio Camargo</td>
              <td>
                <button type="button">responder</button>
              </td>
            </tr>
            <tr>
              <td>Sérgio Camargo</td>
              <td>
                <button type="button">responder</button>
              </td>
            </tr>
            <tr>
              <td>Antonio de Camargo</td>
              <td>
                <button type="button">responder</button>
              </td>
            </tr>
          </tbody>
        </HelpOrdersTable>
      </Content>
    </Container>
  );
}
