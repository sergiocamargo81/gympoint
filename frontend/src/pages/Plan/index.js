import React, { useState, useEffect, useMemo } from 'react';

import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { Link } from 'react-router-dom';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container, Panel, PlanData } from './styles';

export default function Plan({ history }) {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const [errorTitle, setErrorTitle] = useState('');
  const [errorDuration, setErrorDuration] = useState('');
  const [errorPrice, setErrorPrice] = useState('');

  useEffect(() => {
    if (history.location.state && history.location.state.plan) {
      const params = history.location.state.plan;

      setId(params.id);
      setTitle(params.title);
      setDuration(params.duration);
      setPrice(params.price);
    }
  }, [history.location.state]);

  async function save() {
    const plan = { id, title, duration, price };

    const schema = Yup.object().shape({
      title: Yup.string().required(() =>
        setErrorTitle('O título é obrigatório')
      ),
      duration: Yup.number()
        .typeError(() => setErrorDuration('A duração deve ser numérica'))
        .positive(() => setErrorDuration('A duração deve ser positiva'))
        .integer(() => setErrorDuration('A duração deve ser inteira')),
      price: Yup.number()
        .typeError(() => setErrorPrice('O preço deve ser numérico'))
        .positive(() => setErrorPrice('O preço deve ser positivo')),
    });

    if (schema.isValidSync(plan)) {
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

      await (id ? api.put('plans/', plan) : api.post('plans/', plan))
        .then(_then)
        .catch(_catch);
    }
  }

  const total = useMemo(() => {
    const schema = Yup.object().shape({
      duration: Yup.number()
        .typeError()
        .positive()
        .integer(),
      price: Yup.number()
        .typeError()
        .positive(),
    });

    if (schema.isValidSync({ duration, price })) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(duration * price);
    }

    return '';
  }, [duration, price]);

  function onChangeTitle(e) {
    setTitle(e.target.value);

    setErrorTitle('');
  }

  function onChangeDuration(e) {
    setDuration(e.target.value);

    setErrorDuration('');
  }

  function onChangePrice(e) {
    setPrice(e.target.value);

    setErrorPrice('');
  }

  const titlePanel = id ? 'Edição de plano' : 'Cadastro de plano';

  return (
    <Container>
      <Panel>
        <span>{titlePanel}</span>
        <Link to="plans">
          <button type="button">
            <MdChevronLeft size={20} />
            <span>voltar</span>
          </button>
        </Link>
        <button type="button" className="save" onClick={save}>
          <MdCheck size={20} />
          <span>salvar</span>
        </button>
      </Panel>
      <PlanData>
        <label>
          TÍTULO DO PLANO
          <input value={title} type="text" onChange={onChangeTitle} />
          {errorTitle && <span className="error">{errorTitle}</span>}
        </label>
        <div>
          <label>
            DURAÇÃO (em meses)
            <input value={duration} type="text" onChange={onChangeDuration} />
            {errorDuration && <span className="error">{errorDuration}</span>}
          </label>
          <label>
            PREÇO MENSAL
            <input value={price} type="text" onChange={onChangePrice} />
            {errorPrice && <span className="error">{errorPrice}</span>}
          </label>
          <label>
            PREÇO TOTAL
            <span>{total}</span>
          </label>
        </div>
      </PlanData>
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
          title: PropTypes.string,
          duration: PropTypes.number,
          price: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
