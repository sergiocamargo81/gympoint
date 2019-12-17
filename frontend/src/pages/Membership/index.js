import React, { useState, useEffects, useMemo } from 'react';

import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { Link } from 'react-router-dom';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import PropTypes from 'prop-types';

import AsyncSelect from 'react-select/async';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Panel,
  MembershipData,
  AsyncSelectStudent,
  AsyncSelectPlan,
  DatePickerStart,
  InputDisabled,
} from './styles';

registerLocale('pt', pt);

const optionsStudent = inputValue => {
  if (!inputValue) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  }

  return api
    .get(`students/?nameFilter=${inputValue}&page=1&pageSize=10`)
    .then(response =>
      response.data.students.map(s => ({
        value: s.id,
        label: s.name,
      }))
    )
    .catch(error => toast.error(error.toString()));
};

const optionsPlan = inputValue => {
  if (!inputValue) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  }

  return api
    .get(`plans/?nameFilter=${inputValue}&page=1&pageSize=10`)
    .then(response =>
      response.data.plans.map(s => ({
        value: s.id,
        label: s.title,
      }))
    )
    .catch(error => toast.error(error.toString()));
};

export default function Membership({ history }) {
  // const { membership } = history.location.state;

  const [membership, setMembership] = useState({
    id: 0,
    student_id: 0,
    plan_id: 0,
    start_date: new Date(),
  });

  async function handleSubmit({ student_id, plan_id, start_date }) {
    const id = Number(membership.id);

    const _then = () => history.push('memberships');

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
      ? api.put('memberships/', {
          student_id,
          plan_id,
          start_date,
        })
      : api.post('memberships/', { student_id, plan_id, start_date })
    )
      .then(_then)
      .catch(_catch);
  }

  const title = membership.id ? 'Edição de matrícula' : 'Cadastro de matrícula';

  const handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, '');

    return newValue;
  };

  return (
    <Container>
      <Panel>
        <span>{title}</span>
        <Link to="memberships">
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
      <MembershipData>
        <label>
          ALUNO
          <AsyncSelectStudent
            cacheOptions
            loadOptions={optionsStudent}
            defaultOptions
            onInputChange={handleInputChange}
            loadingMessage={() => 'Buscando alunos...'}
            placeholder="Buscar aluno"
          />
        </label>
        <div>
          <label>
            PLANO
            <AsyncSelectPlan
              cacheOptions
              loadOptions={optionsPlan}
              defaultOptions
              onInputChange={handleInputChange}
              loadingMessage={() => 'Buscando planos...'}
              placeholder="Selecione o plano"
            />
          </label>
          <label>
            DATA DE INÍCIO
            <DatePickerStart
              locale="pt"
              placeholderText="Escolha a data"
              // selected={this.state.startDate}
              // onChange={this.handleChange}
            />
          </label>
          <label>
            DATA DE TÉRMINO
            <InputDisabled>{0}</InputDisabled>
          </label>
          <label>
            VALOR FINAL
            <InputDisabled>{0}</InputDisabled>
          </label>
        </div>
      </MembershipData>
    </Container>
  );
}

Membership.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        membership: PropTypes.shape({
          id: PropTypes.number,
        }),
      }),
    }),
  }).isRequired,
};
