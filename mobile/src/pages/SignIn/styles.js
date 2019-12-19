import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  background: #fff;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  margin-bottom: 30px;
`;

export const TextInput = styled.TextInput.attrs({
  placeholder: 'Informe seu ID de cadastro',
})`
  width: 325px;
  height: 45px;

  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
`;
