import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import logo from '~/assets/logo-small.png';

export const Container = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background: #fff;
  border-bottom-color: #ddd;
  border-bottom-width: 1px;
  width: 100%;
  height: 50px;
`;

export const Left = styled.View`
  align-items: flex-start;
  min-width: 20px;
`;

export const Center = styled.View`
  align-items: center;
`;

export const Right = styled.View`
  align-items: flex-end;
  min-width: 20px;
`;

export const Back = styled(Icon).attrs(() => ({
  name: 'chevron-left',
  size: 20,
  color: '#000',
}))``;

export const Logo = styled.Image.attrs(() => ({
  source: logo,
}))``;
