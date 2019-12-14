import React, { useState, useEffect } from 'react';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import PropTypes from 'prop-types';

import Modal from 'react-modal';

import { Container } from './styles';

const customStyles = {
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
};

Modal.setAppElement('#root');

export default function Confirm(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    setIsOpen(props.isOpen);
    setQuestion(props.question);
  }, [props]);

  function close() {
    setIsOpen(false);
    props.onClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={close} style={customStyles}>
      <Container>
        <h1>{question}</h1>
        <div>
          <button type="button" onClick={close}>
            <MdChevronLeft size={20} />
            <span>Não</span>
          </button>
          <button
            id="yes"
            type="button"
            onClick={() => {
              props.onConfirm();
              close();
            }}
          >
            <MdCheck size={20} />
            <span>Sim</span>
          </button>
        </div>
      </Container>
    </Modal>
  );
}

Confirm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  question: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
