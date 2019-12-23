import React from 'react';

import PropTypes from 'prop-types';

import Header from '~/components/Header';

import {
  Container,
  HelpOrder,
  QuestionHeader,
  QuestionTitle,
  QuestionElapsed,
  QuestionBody,
  AnswerTitle,
  AnswerBody,
} from './styles';

export default function HelpOrderAnswered({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder', {});

  return (
    <Container>
      <HelpOrder>
        <QuestionHeader>
          <QuestionTitle>PERGUNTA</QuestionTitle>
          <QuestionElapsed>{helpOrder.elapsed}</QuestionElapsed>
        </QuestionHeader>
        <QuestionBody>{helpOrder.question}</QuestionBody>
        {helpOrder.answered && <AnswerTitle>RESPOSTA</AnswerTitle>}
        {helpOrder.answered && <AnswerBody>{helpOrder.answer}</AnswerBody>}
      </HelpOrder>
    </Container>
  );
}

HelpOrderAnswered.navigationOptions = ({ navigation }) => ({
  header: <Header onBack={() => navigation.navigate('HelpOrders')} />,
});

HelpOrderAnswered.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
