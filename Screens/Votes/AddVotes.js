import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, Button, StatusBar, Text } from 'react-native';
import { Select, Icon, NativeBaseProvider } from 'native-base';

import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';

import { BACKEND_URL } from '@env';

const parishes = [
  { value: 'URCUQUI', label: 'Urcuquí' },
  { value: 'PABLO_ARENAS', label: 'Pablo Arenas' },
  { value: 'CAHUASQUI', label: 'Cahuasquí' },
  { value: 'BUENOS_AIRES', label: 'La Merced de Buenos Aires' },
  { value: 'SAN_BLAS', label: 'San Blas' },
  { value: 'TUMBABIRO', label: 'Tumbabiro' },
];

const precincts = [
  {
    value: 'UNIDAD_EDUCATIVA_BUENOS_AIRES',
    label: 'Unidad Educativa Buenos Aires',
  },
  {
    value: 'ESCUELA_FRANKLIN_ROOSEVELT',
    label: 'Escuela de Educación Basica Franklin Roosevelt',
  },
  {
    value: 'ESCUELA_PALMIRA_TOCTEMI',
    label: 'Escuela y Casa Comunal San Francisco Palmira de Toctemi - Awa',
  },
  { value: 'UNIDAD_EDUCATIVA_CAHUASQUI', label: 'Unidad Educativa Cahuasqui' },
  {
    value: 'UNIDAD_EDUCATIVA_YACHAY',
    label: 'Unidad Educativa del Milenio Yachay / Ex Escuela Abdon Calderon',
  },
  {
    value: 'UNIDAD_EDUCATIVA_ELOY_ALFARO',
    label: 'Unidad Educativa Eloy Alfaro',
  },
  {
    value: 'UNIDAD_EDUCATIVA_PABLO_ARENAS',
    label:
      'Unidad Edcucativa Cahuasqui Bloque Pablo Arenas / Escuela 5 de Junio',
  },
  {
    value: 'UNIDAD_EDUCATIVA_ROCAFUERTE',
    label: 'Unidad Educativa Vicente Rocafuerte',
  },
  { value: 'ESCUELA_HERNAN_CORTEZ', label: 'Antigua Escuela Hernán Cortez' },
  { value: 'UNIDAD_EDUCATIVA_URCUQUI', label: 'Unidad Educativa Urcuquí' },
];

function AddVotes({ route, navigation }) {
  const { candidate } = route.params;

  const [parish, setParish] = useState('');
  const [precinct, setPrecinct] = useState('');
  const [desk, setDesk] = useState();
  const [deskType, setDeskType] = useState('');
  const [votes, setVotes] = useState();

  const patchVotes = () => {
    if (parish === '' || precinct === '' || deskType === '') {
      alert('Por favor, llene todos los campos');
    } else {
      const patchBody = {
        votesAmount: votes,
        parish: parish,
        precinct: precinct,
        desk: desk,
        deskType: deskType,
      };

      axios
        .patch(
          `${BACKEND_URL}/counter_api/v1/candidate/${candidate.id}/votes/add`,
          patchBody
        )
        .then((res) => {
          alert(
            `Se sumaron ${votes} votos a ${candidate.name} ${candidate.lastName}`
          );
          console.log(res.data);

          setParish('');
          setPrecinct('');
          setDesk();
          setDeskType('');
          setVotes();
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
        <Text>
          {candidate.name} {candidate.lastName}
        </Text>
        <Text>{candidate.position}</Text>
        <Text style={{ marginBottom: 20 }}>
          Votos totales: {candidate.totalVotes}
        </Text>

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
          marginBottom={3}
          fontSize={14}
          placeholder="Seleccione una parroquia"
          selectedValue={parish}
          onValueChange={(e) => setParish(e)}
        >
          {parishes.map((p) => {
            return (
              <Select.Item key={p.value} label={p.label} value={p.value} />
            );
          })}
        </Select>

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
          fontSize={14}
          placeholder="Seleccione un recinto electoral"
          selectedValue={precinct}
          onValueChange={(e) => setPrecinct(e)}
        >
          {parish !== '' ? (
            parish === parishes[0].value ? (
              precincts
                .slice(4, 5)
                .concat(precincts.slice(9))
                .map((p) => {
                  return (
                    <Select.Item
                      key={p.value}
                      label={p.label}
                      value={p.value}
                    />
                  );
                })
            ) : parish === parishes[1].value ? (
              precincts
                .slice(1, 2)
                .concat(precincts.slice(6, 7))
                .map((p) => {
                  return (
                    <Select.Item
                      key={p.value}
                      label={p.label}
                      value={p.value}
                    />
                  );
                })
            ) : parish === parishes[2].value ? (
              <Select.Item
                key={precincts[3].value}
                label={precincts[3].label}
                value={precincts[3].value}
              />
            ) : parish === parishes[3].value ? (
              precincts
                .slice(0, 1)
                .concat(precincts.slice(2, 3))
                .map((p) => {
                  return (
                    <Select.Item
                      key={p.value}
                      label={p.label}
                      value={p.value}
                    />
                  );
                })
            ) : parish === parishes[4].value ? (
              precincts
                .slice(5, 6)
                .concat(precincts.slice(8, 9))
                .map((p) => {
                  return (
                    <Select.Item
                      key={p.value}
                      label={p.label}
                      value={p.value}
                    />
                  );
                })
            ) : parish === parishes[5].value ? (
              <Select.Item
                key={precincts[7].value}
                label={precincts[7].label}
                value={precincts[7].value}
              />
            ) : null
          ) : null}
        </Select>

        <Input
          placeholder={'Número de mesa (junta receptora del voto)'}
          name={'desk'}
          id={'desk'}
          value={desk}
          keyboardType={'numeric'}
          onChangeText={(text) => setDesk(text)}
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
          fontSize={14}
          placeholder="Seleccione un tipo de mesa"
          selectedValue={deskType}
          onValueChange={(e) => setDeskType(e)}
        >
          <Select.Item key={'F'} label={'Femenino'} value={'FEMENINO'} />
          <Select.Item key={'M'} label={'Masculino'} value={'MASCULINO'} />
        </Select>

        <Input
          placeholder={'Número de votos'}
          name={'votes'}
          id={'votes'}
          value={votes}
          keyboardType={'numeric'}
          onChangeText={(text) => setVotes(text)}
        />

        <View style={styles.buttonGroup}>
          <Button
            title="Enviar"
            onPress={patchVotes}
            color={'#1948BA'}
          ></Button>
        </View>
      </FormContainer>
    </NativeBaseProvider>
  );
}

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
    borderColor: '#FEE101',
  },
});

export default AddVotes;
