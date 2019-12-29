import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px 0 0 20px;
`;

export const NewHelpButton = styled(Button)`
  margin-right: 20px;
`;

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
})`
  margin-top: 20px;
  align-self: stretch;
  padding-right: 20px;
`;

export const HelpOrder = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Answered = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AnsweredText = styled.Text`
  margin-left: 7px;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const Time = styled.Text`
  color: #666;
`;

export const HelpOrderContent = styled.Text.attrs({
  numberOfLines: 3,
})`
  margin-top: 20px;
  line-height: 26px;
  font-size: 14px;
  color: #666;
`;
