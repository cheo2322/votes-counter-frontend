import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import FormContainer from '../Shared/Form/FormContainer';
import Input from '../Shared/Form/Input';

import { BACKEND_URL } from '@env';

const CandidateNavigator = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [list, setList] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [position, setPosition] = useState('');

  const postCandidate = () => {
    if (
      name === '' ||
      lastName === '' ||
      list === '' ||
      city === '' ||
      province === '' ||
      position === ''
    ) {
      alert('Por favor llene todos los campos');
    } else {
      const candidate = {
        name: name,
        lastName: lastName,
        list: list,
        city: city,
        province: province,
        position: position,
      };

      axios
        .post(`${BACKEND_URL}/counter_api/v1/candidate`, candidate)
        .then((res) => {
          alert(`${res.data.name} agregado correctamente`);

          setName('');
          setLastName('');
          setList('');
          setCity('');
          setProvince('');
          setPosition('');
        })
        .catch((error) => {
          console.error(error);
          alert('Hubo un problema');
        });
    }
  };

  return (
    <FormContainer title={''}>
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
      <Input
        placeholder={'Lista'}
        name={'list'}
        id={'list'}
        value={list}
        keyboardType={'numeric'}
        onChangeText={(text) => setList(text)}
      />
      <Input
        placeholder={'Ciudad'}
        name={'city'}
        id={'city'}
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Input
        placeholder={'Provincia'}
        name={'province'}
        id={'province'}
        value={province}
        onChangeText={(text) => setProvince(text)}
      />
      <Input
        placeholder={'Delegación'}
        name={'position'}
        id={'position'}
        value={position}
        onChangeText={(text) => setPosition(text)}
      />
      <View style={[{ marginBottom: 40 }, styles.buttonGroup]}>
        <Button title="Enviar" onPress={postCandidate}></Button>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
});

export default CandidateNavigator;
