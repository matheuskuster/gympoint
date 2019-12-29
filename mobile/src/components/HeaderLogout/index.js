import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';

// import { Container } from './styles';

export default function HeaderLogout() {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity onPress={() => dispatch(signOut())}>
      <Icon name="exit-to-app" size={24} color="#EE4E62" />
    </TouchableOpacity>
  );
}
