import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import { BACKEND_URL } from '@env';

const HomeNavigator = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [focusCandidate, setFocusCandidate] = useState({});
  const [focusVotes, setFocusVotes] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCandidates();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function getCandidates() {
    axios
      .get(`${BACKEND_URL}/counter_api/v1/candidate`)
      .then((res) => setCandidates(res.data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getCandidates();

    return () => {
      setCandidates();
    };
  }, []);

  const setCandidate = (item) => {
    setFocusCandidate(item);

    axios
      .get(`${BACKEND_URL}/counter_api/v1/candidate/${item.id}/votes`)
      .then((res) => setFocusVotes(res.data))
      .catch((error) => console.error(error));
  };

  const Item = ({ item, index }) => (
    <View
      style={{
        backgroundColor: index % 2 === 0 ? '#E5E4E2' : 'white',
        padding: 10,
      }}
    >
      <Pressable
        key={index}
        onPress={() => {
          setModalVisible(true);
          setCandidate(item);
        }}
      >
        <Text>
          Candidato: {item.name} {item.lastName} {'\n'}
          Delegaci&oacute;n: {item.position} {'\n'}
          Lista: {item.list} {'\n'}
          Votos Totales: {item.totalVotes}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}
        >
          <View style={[styles.modalView, { justifyContent: 'center' }]}>
            <Pressable
              style={[styles.button, styles.marginBtm]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('Votes', {
                  candidateRoute: focusCandidate,
                  votesRoute: focusVotes,
                });
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                Ver votos por parroquias
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.marginBtm]}
              onPress={() => {}}
            >
              <Text style={{ textAlign: 'center' }}>
                Ver votos por recintos electorales
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.marginBtm]}
              onPress={() => {}}
            >
              <Text style={{ textAlign: 'center' }}>
                Ver votos por junta receptora del voto
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.marginBtm]}
              onPress={() => {}}
            >
              <Text style={{ textAlign: 'center' }}>
                Ver votos por g&eacute;nero
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose, { width: 260 }]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setFocusCandidate({});
                setFocusVotes([]);
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
        {/* <ScrollView contentContainerStyle={styles.centeredView}>
          <View style={styles.modalView}>
            {focusCandidate ? (
              <View key={focusCandidate.id}>
                <Text style={styles.modalText}>
                  {focusCandidate.name} {focusCandidate.lastName}
                </Text>
                <Text>{focusCandidate.position}</Text>
                <Text>Lista {focusCandidate.list}</Text>
                <Text>{focusCandidate.totalVotes} votos totales</Text>

                {focusVotes ? (
                  <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Text>Votos por parroquias:</Text>
                    {focusVotes.map((item, index) => {
                      return (
                        <Text key={index}>
                          {item.parish} - {item.precinct} - {item.desk} -{' '}
                          {item.deskType} : {item.votesAmount} votos
                        </Text>
                      );
                    })}
                  </View>
                ) : (
                  <Text style={{ paddingTop: 10, paddingBottom: 10 }}>
                    No hay información de los votos por parroquias
                  </Text>
                )}
              </View>
            ) : (
              <Text>Lo sentimos. No pudimos consultar la información</Text>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setFocusCandidate({});
                setFocusVotes([]);
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </ScrollView> */}
      </Modal>

      <FlatList
        data={candidates}
        renderItem={({ item, index }) => (
          <Item item={item} index={index} key={item.id} />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
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
    padding: 35,
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
  buttonOpen: {
    backgroundColor: '#F194FF',
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
  marginBtm: {
    marginBottom: 10,
    width: 260,
  },
});

export default HomeNavigator;
