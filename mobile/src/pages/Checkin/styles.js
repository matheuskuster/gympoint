import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  padding: 20px 0 0 20px;
  flex: 1;
`;

export const CheckInButton = styled(Button)`
  margin-right: 20px;
`;

export const CheckInList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
})`
  margin-top: 20px;
  align-self: stretch;
  padding-right: 20px;
`;

export const CheckInView = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  padding: 0 20px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
`;
