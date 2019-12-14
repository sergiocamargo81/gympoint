import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';
import { Container } from './styles';

Modal.setAppElement('#root');

export default function Answering(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [helpOrder, setHelpOrder] = useState({ question: '', helpOrder: '' });

  useEffect(() => {
    setIsOpen(props.isOpen);
    setHelpOrder(props.helpOrder);
  }, [props]);

  function closeModal() {
    setIsOpen(false);
  }

  function handleAnswerChange(answer) {
    setHelpOrder({ ...helpOrder, answer });
  }

  function handleAnswer() {
    props.onAnswered(helpOrder);
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
          <p>PERGUNTA DO ALUNO</p>
          <p>{helpOrder.question}</p>
          <p>SUA RESPOSTA</p>
          <textarea
            placeholder="exemplo@email.com"
            type="text"
            value={helpOrder.answer}
            onChange={e => handleAnswerChange(e.target.value)}
          />
          <button type="button" onClick={() => handleAnswer()}>
            Responder aluno
          </button>
        </Container>
      </Modal>
    </>
  );
}
