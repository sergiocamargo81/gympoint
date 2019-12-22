import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ButtonComponent from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
`;

export const Button = styled(ButtonComponent)`
  margin: 25px 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const HelpOrder = styled.View`
  align-items: flex-start;
  background: #fff;
  border: solid 1px #ddd;
  margin: 0 20px 15px;
  border-radius: 4px;
  padding: 20px;
  max-height: 150px;
`;

export const HelpOrderHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 16px;
`;

export const HelpOrderCheck = styled(Icon).attrs(props => ({
  name: 'check-circle',
  color: props.answered ? '#42cb59' : '#999',
  size: 16,
}))`
  margin-right: 5px;
`;

export const HelpOrderStatus = styled.Text`
  flex-grow: 1;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const HelpOrderElapsed = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 26px;
  text-align: right;
`;

export const HelpOrderBody = styled.Text.attrs(() => ({
  numberOfLines: 3,
}))`
  margin-top: 20px;
  text-align: left;
  font-size: 14px;
  color: #666;
  line-height: 26px;
`;
