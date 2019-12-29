/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import {
  Container,
  Content,
  QuestionView,
  QuestionHeader,
  Title,
  Time,
  Text,
  AnswerView,
} from './styles';

export default function Answer({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Background>
      <Container>
        <Content>
          <QuestionView>
            <QuestionHeader>
              <Title>PERGUNTA</Title>
              <Time>{helpOrder.formattedDate}</Time>
            </QuestionHeader>

            <Text>{helpOrder.question}</Text>
          </QuestionView>

          <AnswerView>
            <Title waiting={!helpOrder.answer}>
              {helpOrder.answer ? 'RESPOSTA' : 'AGUARDANDO RESPOSTA'}
            </Title>
            {helpOrder.answer && <Text>{helpOrder.answer}</Text>}
          </AnswerView>
        </Content>
      </Container>
    </Background>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={24} color="#EE4E62" />
    </TouchableOpacity>
  ),
});
