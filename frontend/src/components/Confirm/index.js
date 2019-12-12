import React from 'react';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import PropTypes from 'prop-types';

import { ConfirmUi } from './styles';

export default function Confirm({ question, onConfirm, onClose }) {
  return (
    <ConfirmUi>
      <h1>{question}</h1>
      <div>
        <button type="button" onClick={onClose}>
          <MdChevronLeft size={20} />
          <span>Não</span>
        </button>
        <button
          id="yes"
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          <MdCheck size={20} />
          <span>Sim</span>
        </button>
      </div>
    </ConfirmUi>
  );
}

Confirm.propTypes = {
  question: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
