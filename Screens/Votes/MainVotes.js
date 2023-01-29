//TODO: text color on modal

import React, { useState, useEffect, useCallback, useContext } from 'react';
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
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '@rneui/base';
import { useIsFocused } from '@react-navigation/native';

import { BACKEND_URL } from '@env';
import Banner from '../../Shared/Banner/Banner';

import AuthGlobal from '../../Context/store/AuthGlobal';

const MainVotes = ({ navigation }) => {
  const context = useContext(AuthGlobal);

  const [refreshing, setRefreshing] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [focusCandidate, setFocusCandidate] = useState({});

  const isFocused = useIsFocused();

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
  }, [isFocused]);

  const Item = ({ item, index }) => (
    <View
      style={{
        backgroundColor: index % 2 === 0 ? '#E5E4E2' : 'white',
        padding: 10,
        flexDirection: 'row',
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
          Votos Totales: {item.totalVotes}
        </Text>
      </Pressable>
      <View style={{ position: 'absolute', right: 25, top: 20 }}>
        <Button
          title=""
          icon={<Icon name="plus" size={17} color="white" />}
          onPress={() => navigation.navigate('AddVotes', { candidate: item })}
          color="#1948BA"
        />
      </View>
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
                navigation.navigate('BasicVotes', {
                  candidate: focusCandidate,
                  requestType: 'parish',
                });
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                Ver votos por parroquias
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.marginBtm]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('BasicVotes', {
                  candidate: focusCandidate,
                  requestType: 'precinct',
                });
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                Ver votos por recintos electorales
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.marginBtm]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('DetailedVotes', {
                  candidate: focusCandidate,
                });
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                Ver votos por junta receptora del voto
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose, { width: 260 }]}
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

      <View style={styles.bannerView}>
        <Banner />
      </View>

      <StatusBar
        animated={true}
        backgroundColor="#1948BA"
        barStyle={'light-content'}
      />

      {context.stateUser.isAuthenticated ? (
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
      ) : (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text>Inice sesión para poder ver los datos</Text>

          <View style={styles.buttonGroup}>
            <Button
              title="Ir a iniciar sesión"
              onPress={() => navigation.navigate('Usuario')}
              color={'#1948BA'}
            />
          </View>
        </View>
      )}
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
  marginBtm: {
    marginBottom: 10,
    width: 260,
  },
  bannerView: {
    height: '20%',
    backgroundColor: '#1948BA',
    marginTop: -20,
  },
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default MainVotes;
