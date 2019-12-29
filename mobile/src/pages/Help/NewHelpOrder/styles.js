import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const HelpOrderInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  numberOfLines: 13,
  textAlignVertical: 'top',
  returnKeyType: 'send',
})`
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  color: #999;
  padding: 20px;
  font-size: 16px;
`;

export const HelpOrderSubmitButton = styled(Button)`
  margin-top: 20px;
`;
