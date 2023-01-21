import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Select, Icon, CheckIcon, NativeBaseProvider } from 'native-base';

import FormContainer from '../Shared/Form/FormContainer';
import Input from '../Shared/Form/Input';

import { BACKEND_URL } from '@env';

const positions = ['ALCALDE', 'PREFECTO', 'CONCEJAL'];
// const parishes = [
//   { value: 'SAN_MIGUEL_DE_URCUQUI', label: 'SAN MIGUEL DE URCUQUI' },
//   { value: 'PABLO_ARENAS', label: 'PABLO ARENAS' },
//   { value: 'CAHUASQUI', label: 'CAHUASQUI' },
//   { value: 'BUENOS_AIRES', label: 'BUENOS AIRES' },
//   { value: 'SAN_BLAS', label: 'SAN BLAS' },
//   { value: 'TUMBABIRO', label: 'TUMBABIRO' },
// ];

const CandidateNavigator = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [list, setList] = useState('');
  const [position, setPosition] = useState('');

  const postCandidate = () => {
    if (name === '' || lastName === '' || list === '' || position === '') {
      alert('Por favor llene todos los campos');
    } else {
      const candidate = {
        name: name,
        lastName: lastName,
        list: list,
        position: position,
      };

      axios
        .post(`${BACKEND_URL}/counter_api/v1/candidate`, candidate)
        .then((res) => {
          alert(`${res.data.name} agregado correctamente`);

          setName('');
          setLastName('');
          setList('');
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
        <Input
          placeholder={'Lista'}
          name={'list'}
          id={'list'}
          value={list}
          keyboardType={'numeric'}
          onChangeText={(text) => setList(text)}
        />
        {/* <Select
          minWidth="80%"
          borderColor={'orange.300'}
          height={60}
          borderRadius={20}
          borderWidth={2}
          marginBottom={2.5}
          placeholderStyle={{ color: '#007aff' }}
          placeholderIconColor="#007aff"
          iosIcon={<Icon name="arrow-down" color={'#007aff'} />}
          placeholder="Selecciona una parroquia"
          selectedValue={parish}
          onValueChange={(e) => setParish(e)}
        >
          {parishes.map((p) => {
            return (
              <Select.Item key={p.value} label={p.label} value={p.value} />
            );
          })}
        </Select> */}
        <Select
          minWidth="80%"
          borderColor={'orange.300'}
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
          <Button title="Enviar" onPress={postCandidate}></Button>
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
  input: {
    width: '80%',
    height: 60,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
  },
});

export default CandidateNavigator;
