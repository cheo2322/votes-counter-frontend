import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';

import { BACKEND_URL } from '@env';

function DetailedVotes({ route, navigation }) {
  const [votes, setVotes] = useState([]);
  const { candidate } = route.params;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/counter_api/v1/candidate/${candidate.id}/votes/desk`)
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
            <Text>{candidate.totalVotes} votos totales</Text>

            {votes ? (
              <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                {votes.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{ paddingTop: 10, paddingBottom: 10 }}
                    >
                      <Text>
                        <Text style={{ fontWeight: 'bold' }}>Parroquia: </Text>
                        {item.parish}
                      </Text>

                      {item.votesByPrecinct &&
                      item.votesByPrecinct.length > 0 ? (
                        <View>
                          {item.votesByPrecinct.map((item2, index2) => {
                            return (
                              <View key={index2}>
                                <Text>
                                  <Text style={{ fontWeight: 'bold' }}>
                                    Recinto electoral:{' '}
                                  </Text>
                                  {item2.precinct}
                                </Text>

                                {item2.votesByDesk &&
                                item2.votesByDesk.length > 0 ? (
                                  <View>
                                    {item2.votesByDesk.map((item3, index3) => {
                                      return (
                                        <View key={index3}>
                                          <Text>
                                            {item3.deskType} {item3.desk}:{' '}
                                            {item3.amount}
                                          </Text>
                                        </View>
                                      );
                                    })}
                                  </View>
                                ) : (
                                  <Text>
                                    No existe información de votos por junta
                                    receptora del voto
                                  </Text>
                                )}
                              </View>
                            );
                          })}
                        </View>
                      ) : (
                        <Text>
                          No existe información de votos por recinto electoral
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text style={{ paddingTop: 10, paddingBottom: 10 }}>
                No existe información de votos por parroquia
              </Text>
            )}
          </View>
        ) : (
          <Text>Lo sentimos. No pudimos consultar la información</Text>
        )}
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            navigation.navigate('MainVotes');
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
    backgroundColor: '#1948BA',
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

export default DetailedVotes;
