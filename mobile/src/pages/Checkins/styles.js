import styled from 'styled-components/native';

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

export const Checkin = styled.View`
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: solid 1px #ddd;
  margin: 0 20px 15px;
  border-radius: 4px;
  height: 45px;
  flex-direction: row;
  padding: 20px;
`;

export const CheckinName = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;

export const CheckinElapsed = styled.Text`
  font-size: 14px;
  color: #666;
`;
