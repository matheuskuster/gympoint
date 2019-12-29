/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, HelpOrderInput, HelpOrderSubmitButton } from './styles';

export default function NewHelpOrder({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const id = useSelector(state => state.auth.id);

  async function handleSubmit() {
    setLoading(true);
    try {
      if (question === '') throw Error();

      await api.post(`/students/${id}/help-orders`, {
        question,
      });

      navigation.navigate('ListHelpOrders');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível enviar seu pedido de auxílio.');
    } finally {
      setLoading(true);
    }
  }

  return (
    <Background>
      <Container>
        <HelpOrderInput
          placeholder="Inclua seu pedido de auxílio"
          multiline
          onSubmitEditing={handleSubmit}
          onChangeText={setQuestion}
        />
        <HelpOrderSubmitButton loading={loading} onPress={handleSubmit}>
          Enviar pedido
        </HelpOrderSubmitButton>
      </Container>
    </Background>
  );
}

NewHelpOrder.navigationOptions = ({ navigation }) => ({
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
