import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HeaderLogo from '~/components/HeaderLogo';
import HeaderLogout from '~/components/HeaderLogout';

import SignIn from '~/pages/SignIn';
import Checkin from '~/pages/Checkin';

import ListHelpOrders from '~/pages/Help/ListHelpOrders';
import NewHelpOrder from '~/pages/Help/NewHelpOrder';
import Answer from '~/pages/Help/Answer';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: createStackNavigator(
                { Checkin },
                {
                  defaultNavigationOptions: {
                    headerTitle: <HeaderLogo />,
                    headerRight: <HeaderLogout />,
                    headerLeft: <View />,
                    headerRightContainerStyle: {
                      marginRight: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Check-ins',
                tabBarIcon: (
                  { tintColor } //eslint-disable-line
                ) => <Icon name="edit-location" size={24} color={tintColor} />,
              },
            },
            Help: {
              screen: createStackNavigator(
                {
                  ListHelpOrders,
                  NewHelpOrder,
                  Answer,
                },
                {
                  defaultNavigationOptions: {
                    headerTitle: <HeaderLogo />,
                    headerRight: <HeaderLogout />,
                    headerRightContainerStyle: {
                      marginRight: 20,
                    },
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: (
                  { tintColor } //eslint-disable-line
                ) => <Icon name="live-help" size={20} color={tintColor} />,
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
                borderTopColor: '#ddd',
                height: 70,
              },
              tabStyle: {
                paddingBottom: 10,
                paddingTop: 5,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      }
    )
  );
