import React, { useMemo } from 'react';

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

import { Container, Panel, MembershipData } from './styles';

registerLocale('pt', pt);

const reactSelectStudentOptions = inputValue => {
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

const reactSelectPlanOptions = inputValue => {
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
        label: s.name,
      }))
    )
    .catch(error => toast.error(error.toString()));
};

export default function Membership({ history }) {
  const { membership } = history.location.state;

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

  /*
  const total = useMemo(
    () =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(membership.plan.duration * membership.plan.price),
    [membership.plan.duration, membership.plan.price]
  );
  */

  const title = membership.id ? 'Edição de matrícula' : 'Cadastro de matrícula';

  const handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, '');

    return inputValue;
  };

  /*
  const filterStudents = inputValue => {
    async function loadStudents() {
      const response = await api.get(
        `students/?nameFilter=${inputValue}&page=1&pageSize=10`
      );

      return response.data.students;
    }

    return loadStudents();
  };

  const loadOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterStudents(inputValue));
      }, 100);
    });
  */

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
          <AsyncSelect
            cacheOptions
            loadOptions={reactSelectStudentOptions}
            defaultOptions
            onInputChange={handleInputChange}
            loadingMessage={() => 'Buscando alunos...'}
            placeholder="Buscar aluno"
          />
        </label>
        <div>
          <label>
            PLANO
            <AsyncSelect
              cacheOptions
              loadOptions={reactSelectPlanOptions}
              defaultOptions
              onInputChange={handleInputChange}
              loadingMessage={() => 'Buscando planos...'}
              placeholder="Selecione"
            />
          </label>
          <label>
            DATA DE INÍCIO
            <DatePicker
              locale="pt"
              placeholderText="Escolha a data"
              // selected={this.state.startDate}
              // onChange={this.handleChange}
            />
          </label>
          <label>
            DATA DE TÉRMINO
            <span>{0}</span>
          </label>
          <label>
            VALOR FINAL
            <span>{0}</span>
          </label>
        </div>
      </MembershipData>
    </Container>
  );
}
