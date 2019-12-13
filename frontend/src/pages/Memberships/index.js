import React from 'react';

import { MdAdd, MdCheck } from 'react-icons/md';

import { Container, Panel, Content, MembershipsTable } from './styles';

export default function Memberships() {
  return (
    <Container>
      <Panel>
        <span>Gerenciando matrículas</span>
        <button type="button">
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
            <tr>
              <td>Sérgio Camargo</td>
              <td>Start</td>
              <td> </td>
              <td>30 de Abril de 2019</td>
              <td> </td>
              <td>30 de Maio de 2019</td>
              <td> </td>
              <td>
                <MdCheck size={20} className="active" />
              </td>
              <td> </td>
              <td>
                <button type="button">editar</button>
              </td>
              <td>
                <button type="button">apagar</button>
              </td>
            </tr>
            <tr>
              <td>Antonio de Camargo</td>
              <td>Diamond</td>
              <td> </td>
              <td>14 de Fevereiro de 2019</td>
              <td> </td>
              <td>14 de Fevereiro de 2020</td>
              <td> </td>
              <td>
                <MdCheck size={20} />
              </td>
              <td> </td>
              <td>
                <button type="button">editar</button>
              </td>
              <td>
                <button type="button">apagar</button>
              </td>
            </tr>
          </tbody>
        </MembershipsTable>
      </Content>
    </Container>
  );
}
