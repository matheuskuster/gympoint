/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  NewHelpButton,
  HelpOrderList,
  HelpOrder,
  Header,
  Answered,
  AnsweredText,
  Time,
  HelpOrderContent,
} from './styles';

function ListHelpOrders({ navigation }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(0);

  const id = useSelector(state => state.auth.id);

  async function loadHelpOrders() {
    setLoading(true);
    const response = await api.get('/help-orders', {
      params: { id, page },
    });

    const data = response.data.rows.map(helpOrder => ({
      ...helpOrder,
      formattedDate: formatRelative(parseISO(helpOrder.createdAt), new Date(), {
        locale: pt,
      }),
    }));

    setHelpOrders([...helpOrders, ...data]);
    setMaxPage(response.data.maxPage);
    setLoading(false);
  }

  function handleEndReached() {
    if (page < maxPage) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    loadHelpOrders();
  }, [page]);

  return (
    <Background>
      <Container>
        <NewHelpButton
          loading={loading}
          onPress={() => navigation.navigate('NewHelpOrder')}
        >
          Novo pedido de auxílio
        </NewHelpButton>

        <HelpOrderList
          data={helpOrders}
          keyExtractor={helpOrder => String(helpOrder.id)}
          onEndReachedThreshold={0.2}
          onEndReached={handleEndReached}
          renderItem={({ item: helpOrder }) => (
            <HelpOrder
              onPress={() => navigation.navigate('Answer', { helpOrder })}
            >
              <Header>
                <Answered>
                  <Icon
                    name="check-circle"
                    size={16}
                    color={helpOrder.answer ? '#42cb59' : '#999'}
                  />
                  <AnsweredText answered={!!helpOrder.answer}>
                    {helpOrder.answer ? 'Respondido' : 'Sem resposta'}
                  </AnsweredText>
                </Answered>
                <Time>{helpOrder.formattedDate}</Time>
              </Header>
              <HelpOrderContent>{helpOrder.question}</HelpOrderContent>
            </HelpOrder>
          )}
        />
      </Container>
    </Background>
  );
}

ListHelpOrders.navigationOptions = {
  headerLeft: <View />,
};

export default withNavigationFocus(ListHelpOrders);
