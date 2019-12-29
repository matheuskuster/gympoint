import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background: #fff;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Logo = styled.View`
  align-items: center;
`;

export const LogoImage = styled.Image`
  height: 42px;
  width: 81px;
`;

export const LogoText = styled.Text`
  color: #ee4d64;
  font-weight: bold;
  font-size: 24px;
  margin-top: 12px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  keyboardType: 'number-pad',
  returnKeyType: 'send',
})`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding-left: 30px;
  color: #999;
  font-size: 16px;
  height: 46px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
