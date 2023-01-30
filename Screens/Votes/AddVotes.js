import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';

import { Button } from '@rneui/base';

import { BACKEND_URL } from '@env';

const parishes = [
  { value: 'URCUQUI', label: 'Urcuquí' },
  { value: 'PABLO_ARENAS', label: 'Pablo Arenas' },
  { value: 'CAHUASQUI', label: 'Cahuasquí' },
  { value: 'LA_MERCED_DE_BUENOS_AIRES', label: 'Buenos Aires' },
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

const deskTypes = ['FEMENINO', 'MASCULINO'];

const AddVotes = ({ route, navigation }) => {
  const { candidate } = route.params;

  const [token, setToken] = useState('');

  const [parish, setParish] = useState('');
  const [precinct, setPrecinct] = useState('');
  const [desk, setDesk] = useState();
  const [deskType, setDeskType] = useState('');
  const [votes, setVotes] = useState();
  const [selectedPrecincts, setSelectedPrecincts] = useState([]);
  const [selectedDesks, setSelectedDesks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then((res) => setToken(res))
      .catch((error) => console.error(error));

    return () => {
      setToken();
    };
  }, []);

  const patchVotes = () => {
    if (
      parish === '' ||
      precinct === '' ||
      deskType === '' ||
      desk === '' ||
      votes === ''
    ) {
      alert('Por favor, llene todos los campos');
    } else {
      const patchBody = {
        votesAmount: votes,
        parish: parish,
        precinct: precinct,
        desk: desk,
        deskType: deskType,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .patch(
          `${BACKEND_URL}/counter_api/v1/candidate/${candidate.id}/votes/add`,
          patchBody,
          config
        )
        .then((res) => {
          alert(
            `Se sumaron ${votes} votos a ${candidate.name} ${candidate.lastName}`
          );

          setDesk();
          setVotes();
        })
        .catch((error) => {
          console.error(error);
          alert('Hubo un problema');
        });
    }
  };

  const setParishAndSelectedPrecincts = (item, index) => {
    setParish(item);
    setPrecinct('');
    setSelectedDesks([]);
    setDeskType('');

    if (index === 0) {
      setSelectedPrecincts([precincts[4], precincts[9]]);
    } else if (index === 1) {
      setSelectedPrecincts([precincts[1], precincts[6]]);
    } else if (index === 2) {
      setSelectedPrecincts([precincts[3]]);
    } else if (index === 3) {
      setSelectedPrecincts([precincts[0], precincts[2]]);
    } else if (index === 4) {
      setSelectedPrecincts([precincts[5], precincts[8]]);
    } else if (index === 5) {
      setSelectedPrecincts([precincts[7]]);
    }
  };

  const setPrecinctAndDeskStuff = (item) => {
    setPrecinct(item);
    setDeskType('');
    setSelectedDesks([]);
  };

  const setDeskTypeAndDesks = (item, index) => {
    setDeskType(item);
    setDesk();

    if (precinct === precincts[0].value || precinct === precincts[6].value) {
      if (index === 0) {
        setSelectedDesks(['1', '2']);
      } else {
        setSelectedDesks(['1', '2', '3']);
      }
    } else if (
      precinct === precincts[1].value ||
      precinct === precincts[2].value ||
      precinct === precincts[8].value
    ) {
      if (index === 0) {
        setSelectedDesks(['1']);
      } else {
        setSelectedDesks(['1']);
      }
    } else if (precinct === precincts[3].value) {
      if (index === 0) {
        setSelectedDesks(['1', '2', '3']);
      } else {
        setSelectedDesks(['1', '2', '3']);
      }
    } else if (
      precinct === precincts[4].value ||
      precinct === precincts[5].value
    ) {
      if (index === 0) {
        setSelectedDesks(['1', '2', '3', '4']);
      } else {
        setSelectedDesks(['1', '2', '3', '4']);
      }
    } else if (precinct === precincts[7].value) {
      if (index === 0) {
        setSelectedDesks(['1', '2']);
      } else {
        setSelectedDesks(['1', '2']);
      }
    } else if (precinct === precincts[9].value) {
      if (index === 0) {
        setSelectedDesks(['1', '2', '3', '4', '5']);
      } else {
        setSelectedDesks(['1', '2', '3', '4', '5', '6']);
      }
    }
  };

  return (
    <FormContainer>
      <Text>
        {candidate.name} {candidate.lastName}
      </Text>
      <Text>{candidate.position}</Text>
      <Text style={{ marginBottom: 20 }}>
        Votos totales: {candidate.totalVotes}
      </Text>

      <View style={{ padding: 10, flex: 1 }}>
        <Text style={styles.label}>Seleccione una parroquia</Text>
        <View style={styles.row}>
          {parishes.map((item, index) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => setParishAndSelectedPrecincts(item.value, index)}
              style={[styles.button, parish === item.value && styles.selected]}
            >
              <Text style={styles.buttonLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {parish !== '' ? (
        <View style={{ padding: 10, flex: 1 }}>
          <Text style={styles.label}>Seleccione un recinto electoral</Text>
          <View style={styles.row}>
            {selectedPrecincts.map((item, index) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => setPrecinctAndDeskStuff(item.value, index)}
                style={[
                  styles.button,
                  precinct === item.value && styles.selected,
                ]}
              >
                <Text style={styles.buttonLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : null}

      {precinct !== '' ? (
        <View style={{ padding: 10, flex: 1 }}>
          <Text style={styles.label}>Seleccione un tipo de mesa</Text>
          <View style={styles.row}>
            {deskTypes.map((item, index) => (
              <TouchableOpacity
                key={item}
                onPress={() => setDeskTypeAndDesks(item, index)}
                style={[styles.button, deskType === item && styles.selected]}
              >
                <Text style={styles.buttonLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : null}

      {deskType !== '' ? (
        <View style={{ padding: 10, flex: 1 }}>
          <Text style={styles.label}>
            Seleccione el número de mesa (junta receptora del voto)
          </Text>
          <View style={styles.row}>
            {selectedDesks.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setDesk(item)}
                style={[styles.button, desk === item && styles.selected]}
              >
                <Text style={styles.buttonLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : null}

      {desk ? (
        <Input
          placeholder={'Número de votos'}
          name={'votes'}
          id={'votes'}
          value={votes}
          keyboardType={'numeric'}
          onChangeText={(text) => setVotes(text)}
        />
      ) : null}

      <View style={styles.buttonGroup}>
        <Button title="Enviar" onPress={patchVotes} color={'#1948BA'}></Button>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
    margin: 40,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FEE101',
    backgroundColor: '#F7F7F7',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '30%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#FEE101',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AddVotes;
