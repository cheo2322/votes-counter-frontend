import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [username, setUsername] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate('Login');
      } else {
        AsyncStorage.getItem('jwt')
          .then(() => {
            setUsername(context.stateUser.user.sub);
          })
          .catch((error) => console.error(error));
      }

      return () => {
        setUsername();
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <ScrollView contentContainerStyle={styles.subContainer}>
      <Text style={{ fontSize: 30 }}>Sesión iniciada: {username}</Text>
      <View style={{ marginTop: 20 }}>
        <Button
          title={'Cerrar sesión'}
          color={'#1948BA'}
          onPress={() => [
            AsyncStorage.removeItem('jwt'),
            logoutUser(context.dispatch),
          ]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
});

export default UserProfile;
