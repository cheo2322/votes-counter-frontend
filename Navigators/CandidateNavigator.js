import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, Button, StatusBar } from 'react-native';
import { Select, Icon, NativeBaseProvider } from 'native-base';

import FormContainer from '../Shared/Form/FormContainer';
import Input from '../Shared/Form/Input';

import { BACKEND_URL } from '@env';

const positions = ['PREFECTO', 'ALCALDE', 'CONCEJAL URBANO', 'CONCEJAL RURAL'];

const CandidateNavigator = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');

  const postCandidate = () => {
    if (name === '' || lastName === '' || position === '') {
      alert('Por favor llene todos los campos');
    } else {
      const candidate = {
        name: name,
        lastName: lastName,
        position: position.replace(' ', '_'),
      };

      axios
        .post(`${BACKEND_URL}/counter_api/v1/candidate`, candidate)
        .then((res) => {
          alert(`${res.data.name} agregado correctamente`);

          setName('');
          setLastName('');
          setPosition('');
        })
        .catch((error) => {
          console.error(error);
          alert('Hubo un problema');
        });
    }
  };

  return (
    <NativeBaseProvider>
      <StatusBar
        animated={true}
        backgroundColor="#1948BA"
        barStyle={'light-content'}
      />

      <FormContainer>
        <Input
          placeholder={'Nombre'}
          name={'name'}
          id={'name'}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={'Apellido'}
          name={'lastName'}
          id={'lastName'}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <Select
          minWidth="80%"
          backgroundColor={'white'}
          borderColor={'#FEE101'}
          height={60}
          borderRadius={20}
          borderWidth={2}
          placeholderStyle={{ color: '#007aff' }}
          placeholderIconColor="#007aff"
          iosIcon={<Icon name="arrow-down" color={'#007aff'} />}
          placeholder="Selecciona una delegación"
          selectedValue={position}
          onValueChange={(e) => setPosition(e)}
        >
          {positions.map((p) => {
            return <Select.Item key={p} label={p} value={p} />;
          })}
        </Select>
        <View style={styles.buttonGroup}>
          <Button
            title="Enviar"
            onPress={postCandidate}
            color={'#1948BA'}
          ></Button>
        </View>
      </FormContainer>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
    margin: 40,
  },
});

export default CandidateNavigator;
