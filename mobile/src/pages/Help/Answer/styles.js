import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Content = styled.View`
  background: #fff;
  padding: 20px;
  border-radius: 4px;
`;

export const QuestionView = styled.View``;

export const QuestionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${props => (!props.waiting ? '#444' : '#ccc')};
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #666;
`;

export const Text = styled.Text`
  line-height: 26px;
  color: #666;
  margin-top: 10px;
`;

export const AnswerView = styled.View`
  margin-top: 20px;
`;
