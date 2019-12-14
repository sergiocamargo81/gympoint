import React, { useMemo } from 'react';

import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { Link } from 'react-router-dom';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';

import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container, Panel, PlanData } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .typeError('A duração deve ser numérica')
    .positive('A duração deve ser positiva')
    .integer('A duração deve ser inteira'),
  price: Yup.number()
    .typeError('O preço deve ser numérico')
    .positive('O preço deve ser positivo'),
});

export default function Plan({ history }) {
  const { plan } = history.location.state;

  async function handleSubmit({ title, duration, price }) {
    const id = Number(plan.id);

    const _then = () => history.push('plans');

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
      ? api.put('plans/', {
          id,
          title,
          duration,
          price,
        })
      : api.post('plans/', { title, duration, price })
    )
      .then(_then)
      .catch(_catch);
  }

  const total = useMemo(
    () =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(plan.duration * plan.price),
    [plan.duration, plan.price]
  );

  const title = plan.id ? 'Edição de plano' : 'Cadastro de plano';

  return (
    <Container>
      <Form initialData={plan} schema={schema} onSubmit={handleSubmit}>
        <Panel>
          <span>{title}</span>
          <Link to="plans">
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
        <PlanData>
          <label>
            TÍTULO DO PLANO
            <Input name="title" type="text" />
          </label>
          <div>
            <label>
              DURAÇÃO (em meses)
              <Input name="duration" type="text" />
            </label>
            <label>
              PREÇO MENSAL
              <Input name="price" type="text" />
            </label>
            <label>
              PREÇO TOTAL
              <span>{total}</span>
            </label>
          </div>
        </PlanData>
      </Form>
    </Container>
  );
}

Plan.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        plan: PropTypes.shape({
          id: PropTypes.number,
        }),
      }),
    }),
  }).isRequired,
};
