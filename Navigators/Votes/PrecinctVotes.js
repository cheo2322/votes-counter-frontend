import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';

import { BACKEND_URL } from '@env';

function PrecinctVotes({ route, navigation }) {
  const [votes, setVotes] = useState([]);
  const { candidate, requestType } = route.params;

  var spanishType = 'junta receptora del voto';
  if (requestType === 'precinct') {
    spanishType = 'recinto electoral';
  }

  useEffect(() => {
    axios
      .get(
        `${BACKEND_URL}/counter_api/v1/candidate/${candidate.id}/votes/${requestType}`
      )
      .then((res) => setVotes(res.data))
      .catch((error) => console.error(error));

    return () => {
      setVotes([]);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.centeredView}>
      <View style={styles.modalView}>
        {candidate ? (
          <View key={candidate.id}>
            <Text style={styles.modalText}>
              {candidate.name} {candidate.lastName}
            </Text>
            <Text>{candidate.position}</Text>
            <Text>Lista {candidate.list}</Text>
            <Text>{candidate.totalVotes} votos totales</Text>

            {votes && votes.length > 0 ? (
              <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Text>Votos por {spanishType}:</Text>
                {votes.map((item, index) => {
                  return (
                    <Text key={index}>
                      {item.parish} - {item.precinct} - {item.deskType} -{' '}
                      {item.desk}: {item.votesAmount} votos
                    </Text>
                  );
                })}
              </View>
            ) : (
              <Text style={{ paddingTop: 10, paddingBottom: 10 }}>
                No hay información de los votos por {spanishType}
              </Text>
            )}
          </View>
        ) : (
          <Text>Lo sentimos. No pudimos consultar la información</Text>
        )}
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            navigation.navigate('Main');
            setVotes([]);
          }}
        >
          <Text style={styles.textStyle}>Cerrar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default PrecinctVotes;
