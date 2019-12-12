import React, { useState, useEffect } from 'react';

import * as Yup from 'yup';

import { Link } from 'react-router-dom';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import { Container, Panel, StudentData } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O Nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  age: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function Student({ history }) {
  const { student } = history.location.state;

  async function handleSubmit({ name, email, age, weight, height }) {
    const id = Number(student.id);

    if (id) {
      console.log(`update! id: ${id}`);
      await api.put('students/', {
        id,
        name,
        email,
        age,
        weight,
        height,
      });
    } else {
      console.log('create!');
      await api.post('students/', { name, email, age, weight, height });
    }

    history.push('students');
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
