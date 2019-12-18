import React, { useState, useEffect, useMemo } from 'react';

import { addMonths, parseISO, format } from 'date-fns';

import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { Link } from 'react-router-dom';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import PropTypes from 'prop-types';

import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Panel,
  MembershipData,
  AsyncSelectStudent,
  SelectPlan,
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
    .then(response => response.data.students)
    .catch(error => toast.error(error.toString()));
};

export default function Membership({ history }) {
  const [membership, setMembership] = useState({
    id: 0,
    start_date: '',
  });

  const [plan, setPlan] = useState({
    id: 0,
    title: '',
    duration: 0,
    price: 0,
  });

  const [student, setStudent] = useState({
    id: 0,
    name: '',
  });

  const [plans, setPlans] = useState([]);

  const [errorStudent, setErrorStudent] = useState('');

  const [errorPlan, setErrorPlan] = useState('');

  const [errorStartDate, setErrorStartDate] = useState('');

  useEffect(() => {
    async function loadPlans() {
      const responsePlans = await api
        .get(`plans/?page=1&pageSize=9999999`)
        .then(response => response.data.plans);

      setPlans(responsePlans);
    }

    loadPlans();
  }, []);

  useEffect(() => {
    if (history.location.state && history.location.state.membership) {
      const params = history.location.state.membership;

      setMembership({
        id: params.id,
        start_date: parseISO(params.start_date),
      });

      if (params.plan) {
        setPlan({
          id: params.plan.id,
          title: params.plan.title,
          duration: params.plan.duration,
          price: params.plan.price,
        });
      }

      if (params.student) {
        setStudent({
          id: params.student.id,
          name: params.student.name,
        });
      }
    }
  }, [history.location.state]);

  const formattedEndDate = useMemo(() => {
    if (membership.start_date && plan.duration) {
      const endDate = addMonths(membership.start_date, plan.duration);

      return format(endDate, 'd/MM/yyyy');
    }

    return '';
  }, [membership, plan.duration]);

  const formattedTotalPrice = useMemo(() => {
    if (plan.duration && plan.price) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(plan.duration * plan.price);
    }

    return '';
  }, [plan.duration, plan.price]);

  function isValid(membershipChanged) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .typeError(() => setErrorStudent('O aluno é obrigatório'))
        .positive(() => setErrorStudent('O aluno é obrigatório')),
      plan_id: Yup.number()
        .typeError(() => setErrorPlan('O plano é obrigatório'))
        .positive(() => setErrorPlan('O plano é obrigatório')),
      start_date: Yup.date().typeError(() =>
        setErrorStartDate('A data é obrigatória')
      ),
    });

    return schema.isValidSync(membershipChanged);
  }

  async function save() {
    const membershipChanged = {
      id: membership.id,
      student_id: student.id,
      plan_id: plan.id,
      start_date: membership.start_date,
    };

    if (isValid(membershipChanged)) {
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

      await (membershipChanged.id
        ? api.put('memberships/', membershipChanged)
        : api.post('memberships/', membershipChanged)
      )
        .then(_then)
        .catch(_catch);
    }
  }

  function onChangeStudent(s) {
    setStudent(s);

    setErrorStudent('');
  }

  function onChangePlan(p) {
    setPlan(p);

    setErrorPlan('');
  }

  function onChangeStartDate(date) {
    setMembership({ ...membership, start_date: date });

    setErrorStartDate('');
  }

  const title = membership.id ? 'Edição de matrícula' : 'Cadastro de matrícula';

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
        <button type="button" className="save" onClick={save}>
          <MdCheck size={20} />
          <span>salvar</span>
        </button>
      </Panel>
      <MembershipData>
        <label>
          ALUNO
          <AsyncSelectStudent
            loadOptions={optionsStudent}
            getOptionValue={option => option}
            getOptionLabel={option => option.name}
            defaultValue={student}
            value={student}
            defaultOptions
            loadingMessage={() => 'Buscando alunos...'}
            placeholder="Buscar aluno"
            onChange={onChangeStudent}
          />
          {errorStudent && <span className="error">{errorStudent}</span>}
        </label>
        <div>
          <label>
            PLANO
            <SelectPlan
              options={plans}
              getOptionValue={option => option}
              getOptionLabel={option => option.title}
              defaultValue={plan}
              value={plan}
              defaultOptions
              loadingMessage={() => 'Buscando planos...'}
              placeholder="Selecione o plano"
              onChange={onChangePlan}
            />
            {errorPlan && <span className="error">{errorPlan}</span>}
          </label>
          <label>
            DATA DE INÍCIO
            <DatePickerStart
              locale="pt"
              selected={membership.start_date}
              placeholderText="Escolha a data"
              dateFormat="d/MM/yyyy"
              onChange={onChangeStartDate}
            />
            {errorStartDate && <span className="error">{errorStartDate}</span>}
          </label>
          <label>
            DATA DE TÉRMINO
            <InputDisabled>{formattedEndDate}</InputDisabled>
          </label>
          <label>
            VALOR FINAL
            <InputDisabled>{formattedTotalPrice}</InputDisabled>
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
          start_date: PropTypes.string,
          plan: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            duration: PropTypes.number,
            price: PropTypes.string,
          }),
          student: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
        }),
      }),
    }),
  }).isRequired,
};
