import React from 'react';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Container, Panel, StudentData } from './styles';

export default function Student({ id }) {
  return (
    <Container>
      <Panel>
        <span>Cadastro de Aluno</span>
        <button type="submit">
          <MdChevronLeft size={20} />
          <span>voltar</span>
        </button>
        <button type="submit" className="save">
          <MdCheck size={20} />
          <span>salvar</span>
        </button>
      </Panel>
      <StudentData>
        <label>
          NOME COMPLETO
          <input type="text" placeholder="John Doe" />
        </label>
        <label>
          ENDEREÇO DE E-MAIL
          <input type="text" placeholder="exemplo@email.com" />
        </label>
        <div>
          <label>
            IDADE
            <input type="text" />
          </label>
          <label>
            PESO (em kg)
            <input type="text" />
          </label>
          <label>
            Altura
            <input type="text" />
          </label>
        </div>
      </StudentData>
    </Container>
  );
}
