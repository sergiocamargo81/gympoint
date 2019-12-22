import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
`;

export const HelpOrder = styled.View`
  background: #fff;
  border-width: 1px;
  border-color: #ddd;
  margin: 25px 20px 0;
  padding: 20px;
`;

export const QuestionHeader = styled.View`
  flex-direction: row;
  align-content: space-between;
`;

export const QuestionTitle = styled.Text`
  flex: 1;
  font-size: 14px;
  color: #444c;
  text-align: left;
  font-weight: bold;
`;

export const QuestionElapsed = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: right;
`;

export const QuestionBody = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 26px;
  text-align: left;
  margin-top: 16px;
`;

export const AnswerTitle = styled.Text`
  font-size: 14px;
  color: #444c;
  text-align: left;
  font-weight: bold;
  margin-top: 20px;
`;

export const AnswerBody = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 26px;
  text-align: left;
  margin-top: 16px;
`;
