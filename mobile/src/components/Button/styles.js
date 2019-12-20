import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 45px;
  border-radius: 4px;
  background-color: #ee4d64;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
