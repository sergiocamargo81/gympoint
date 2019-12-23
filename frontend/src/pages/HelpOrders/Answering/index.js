import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Modal from 'react-modal';

import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { Container } from './styles';

import api from '~/services/api';

Modal.setAppElement('#root');

const schema = Yup.string()
  .trim()
  .required();

export default function Answering(props) {
  const [isOpen, setIsOpen] = useState(false);

  const [helpOrder, setHelpOrder] = useState({ question: '', helpOrder: '' });

  useEffect(() => {
    setIsOpen(props.isOpen);
    setHelpOrder(props.helpOrder);
  }, [props]);

  function closeModal() {
    setIsOpen(false);

    props.onClose();
  }

  function handleAnswerChange(answer) {
    setHelpOrder({ ...helpOrder, answer });
  }

  async function handleAnswer() {
    if (schema.isValidSync(helpOrder.answer)) {
      try {
        await api.post(`/help-orders/${helpOrder.id}/answer/`, helpOrder);

        props.onAnswer(helpOrder);
      } catch (e) {
        let message;

        if (e.response) {
          message = e.response.data.error;
        } else if (e.request) {
          message = e.request.toString();
        } else {
          message = e.message;
        }

        toast.error(message);
      }
    }

    props.onClose();
  }

  return (
    <>
      <Modal
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            background: '#fff',
            padding: '30px',
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
        isOpen={isOpen}
        onRequestClose={closeModal}
      >
        <Container>
          <span>PERGUNTA DO ALUNO</span>
          <span>{helpOrder.question}</span>
          <span>SUA RESPOSTA</span>
          <textarea
            placeholder="exemplo@email.com"
            type="text"
            value={helpOrder.answer}
            onChange={e => handleAnswerChange(e.target.value)}
            minLength="2"
            maxLength="10000"
          />
          <button type="button" onClick={() => handleAnswer()}>
            Responder aluno
          </button>
        </Container>
      </Modal>
    </>
  );
}

Answering.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  helpOrder: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.string,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
