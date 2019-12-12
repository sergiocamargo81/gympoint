import React from 'react';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { Link } from 'react-router-dom';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';

import PropTypes from 'prop-types';
import api from '~/services/api';

import { Container, Panel, StudentData } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O Nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  age: Yup.number()
    .typeError('A idade deve ser numérica')
    .positive('A idade deve ser positiva')
    .integer('A idade deve ser inteira'),
  weight: Yup.number()
    .typeError('O peso deve ser numérica')
    .positive('O peso deve ser positivo'),
  height: Yup.number()
    .typeError('A altura deve ser numérica')
    .positive('A altura deve ser positiva'),
});

export default function Student({ history }) {
  const { student } = history.location.state;

  async function handleSubmit({ name, email, age, weight, height }) {
    const id = Number(student.id);

    const _then = () => history.push('students');

    const _catch = e => {
      let message;

      if (e.response) {
        message = e.response.data.error;
      } else if (e.request) {
        message = e.request.toString();
      } else {
        message = e.message;
      }

      toast.error(message);
    };

    await (id
      ? api.put('students/', {
          id,
          name,
          email,
          age,
          weight,
          height,
        })
      : api.post('students/', { name, email, age, weight, height })
    )
      .then(_then)
      .catch(_catch);
  }

  const title = student.id ? 'Edição de Aluno' : 'Cadastro de Aluno';

  return (
    <Container>
      <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
        <Panel>
          <span>{title}</span>
          <Link to="students">
            <button type="button">
              <MdChevronLeft size={20} />
              <span>voltar</span>
            </button>
          </Link>
          <button type="submit" className="save">
            <MdCheck size={20} />
            <span>salvar</span>
          </button>
        </Panel>
        <StudentData>
          <label>
            NOME COMPLETO
            <Input name="name" type="text" placeholder="John Doe" />
          </label>
          <label>
            ENDEREÇO DE E-MAIL
            <Input name="email" type="text" placeholder="exemplo@email.com" />
          </label>
          <div>
            <label>
              IDADE
              <Input name="age" type="text" />
            </label>
            <label>
              PESO (em kg)
              <Input name="weight" type="text" />
            </label>
            <label>
              Altura
              <Input name="height" type="text" />
            </label>
          </div>
        </StudentData>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        student: PropTypes.shape({
          id: PropTypes.number,
        }),
      }),
    }),
  }).isRequired,
};
