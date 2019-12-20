import styled from 'styled-components/native';

import ButtonComponent from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
`;

export const Button = styled(ButtonComponent)`
  margin: 25px 20px 10px;
`;

export const List = styled.FlatList``;

export const Checkin = styled.View`
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: solid 1px #ddd;
  margin: 15px 20px 0;
  border-radius: 4px;
  height: 45px;
  flex-direction: row;
  padding: 20px;
`;

export const CheckinName = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;

export const CheckinElapsed = styled.Text`
  font-size: 14px;
`;
