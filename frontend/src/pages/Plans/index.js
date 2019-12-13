import React from 'react';

import { MdAdd } from 'react-icons/md';

import { Container, Panel, Content, PlansTable } from './styles';

export default function Plans() {
  return (
    <Container>
      <Panel>
        <span>Gerenciando planos</span>
        <button type="button">
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
            <tr>
              <td>Start</td>
              <td>1 mês</td>
              <td />
              <td>R$129,00</td>
              <td />
              <td>
                <button type="button">editar</button>
              </td>
              <td>
                <button type="button">apagar</button>
              </td>
            </tr>
            <tr>
              <td>Gold</td>
              <td>3 meses</td>
              <td />
              <td>R$109,00</td>
              <td />
              <td>
                <button type="button">editar</button>
              </td>
              <td>
                <button type="button">apagar</button>
              </td>
            </tr>
            <tr>
              <td>Diamond</td>
              <td>6 meses</td>
              <td />
              <td>R$89,00</td>
              <td />
              <td>
                <button type="button">editar</button>
              </td>
              <td>
                <button type="button">apagar</button>
              </td>
            </tr>
          </tbody>
        </PlansTable>
      </Content>
    </Container>
  );
}
