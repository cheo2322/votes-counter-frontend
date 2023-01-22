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
} from 'react-native';
import { BACKEND_URL } from '@env';

const HomeNavigator = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [focusCandidate, setFocusCandidate] = useState({});

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
          setFocusCandidate(item);
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
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {focusCandidate ? (
              <View key={focusCandidate.id}>
                <Text style={styles.modalText}>
                  {focusCandidate.name} {focusCandidate.lastName}
                </Text>
                <Text>{focusCandidate.position}</Text>
                <Text>Lista {focusCandidate.list}</Text>
                <Text>{focusCandidate.totalVotes} votos totales</Text>

                {focusCandidate.votes ? (
                  <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Text>Votos por parroquias:</Text>
                    {focusCandidate.votes.map((item, index) => {
                      return (
                        <Text key={index}>
                          {item.parish} : {item.votesAmount}
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
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
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
    flex: 1,
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
});

export default HomeNavigator;
