import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';

import { BACKEND_URL } from '@env';

const parishes = [
  { value: 'URCUQUI', label: 'Urcuquí' },
  { value: 'PABLO_ARENAS', label: 'Pablo Arenas' },
  { value: 'CAHUASQUI', label: 'Cahuasquí' },
  { value: 'BUENOS_AIRES', label: 'Buenos Aires' },
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

  const [parish, setParish] = useState('');
  const [precinct, setPrecinct] = useState('');
  const [desk, setDesk] = useState();
  const [deskType, setDeskType] = useState('');
  const [votes, setVotes] = useState();
  const [selectedPrecincts, setSelectedPrecincts] = useState([]);
  const [precintSelectDisabled, setPrecinctSelectedDisabled] = useState(true);
  const [deskTypeDisabled, setDeskTypeDisabled] = useState(true);
  const [deskInputEditable, setDeskInputEditable] = useState(false);
  const [votesInputEditable, setVotesInputEditable] = useState(false);

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

      axios
        .patch(
          `${BACKEND_URL}/counter_api/v1/candidate/${candidate.id}/votes/add`,
          patchBody
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

  return (
    <FormContainer>
      <Text>
        {candidate.name} {candidate.lastName}
      </Text>
      <Text>{candidate.position}</Text>
      <Text style={{ marginBottom: 20 }}>
        Votos totales: {candidate.totalVotes}
      </Text>

      <SelectDropdown
        data={parishes}
        defaultValue={null}
        defaultButtonText={'Seleccione una parroquia'}
        buttonTextStyle={{ fontSize: 14 }}
        rowTextStyle={{ fontSize: 14 }}
        buttonStyle={{ width: 250, borderBottomColor: '#FEE101' }}
        onSelect={(selectedItem, index) => {
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

          setPrecinctSelectedDisabled(false);

          setParish(selectedItem.value);
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem.label;
        }}
        rowTextForSelection={(item) => {
          return item.label;
        }}
      />

      <SelectDropdown
        data={selectedPrecincts}
        disabled={precintSelectDisabled}
        defaultButtonText={'Seleccione un recinto electoral'}
        buttonTextStyle={{ fontSize: 14 }}
        rowTextStyle={{ fontSize: 14 }}
        buttonStyle={{ width: 250 }}
        onSelect={(selectedItem) => {
          setDeskTypeDisabled(false);
          setPrecinct(selectedItem.value);
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem.label;
        }}
        rowTextForSelection={(item) => {
          return item.label;
        }}
      />

      <SelectDropdown
        data={deskTypes}
        disabled={deskTypeDisabled}
        defaultButtonText={'Seleccione un tipo de mesa'}
        buttonTextStyle={{ fontSize: 14 }}
        rowTextStyle={{ fontSize: 14 }}
        buttonStyle={{ width: 250 }}
        onSelect={(selectedItem) => {
          setDeskInputEditable(true);
          setDeskType(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
      />

      <Input
        editable={deskInputEditable}
        placeholder={'Número de mesa (junta receptora del voto)'}
        name={'desk'}
        id={'desk'}
        value={desk}
        keyboardType={'numeric'}
        onChangeText={(text) => {
          setVotesInputEditable(true);
          setDesk(text);
        }}
      />

      <Input
        editable={votesInputEditable}
        placeholder={'Número de votos'}
        name={'votes'}
        id={'votes'}
        value={votes}
        keyboardType={'numeric'}
        onChangeText={(text) => setVotes(text)}
      />

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
