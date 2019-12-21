import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
`;

export const Question = styled.TextInput.attrs(() => ({
  multiline: true,
  placeholder: 'Inclua seu pedido de auxílio',
  textAlignVertical: 'top',
  numberOfLines: 13,
}))`
  background: #fff;
  margin: 20px;
  height: 300px;
  border-width: 1px;
  border-color: #ddd;
  padding: 20px;
  font-size: 16px;
  color: #666;
`;

export const Send = styled(Button)`
  margin: 0 20px 20px;
`;
