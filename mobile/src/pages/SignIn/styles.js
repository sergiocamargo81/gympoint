import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 30px;
`;

export const FormInput = styled.TextInput`
  height: 45px;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 16px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
