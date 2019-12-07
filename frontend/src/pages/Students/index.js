import React from 'react';
import api from '~/services/api';

import { Container, StudentsTable } from './styles';

export default function Students() {
  const data = [
    { name: 'Sérgio Camargo', email: 'sergiocamargo81@gmail.com', age: 39 },
    {
      name: 'Alexandre Camargo',
      email: 'alexandrecamargo81@gmail.com',
      age: 10,
    },
    {
      name: 'Antônio de Camargo',
      email: 'antoniocamargo50@gmail.com',
      age: 69,
    },
  ];

  return (
    <Container>
      <div>
        <span>Gerenciando alunos</span>
        <button type="submit">Cadastrar</button>
        <input type="text" placeholder="Buscar aluno" />
      </div>
      <StudentsTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Idade</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map(s => (
            <tr>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>editar</td>
              <td>apagar</td>
            </tr>
          ))}
        </tbody>
      </StudentsTable>
    </Container>
  );
}
