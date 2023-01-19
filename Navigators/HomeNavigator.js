import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { BACKEND_URL } from '@env';

const HomeNavigator = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [candidates, setCandidates] = useState([]);

  const onRefresh = React.useCallback(() => {
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
      <Text>
        Candidato: {item.name} {item.lastName} {'\n'}
        Delegaci&oacute;n: {item.position} {'\n'}
        Lista: {item.list} {'\n'}
        Ciudad: {item.city} {'\n'}
        Provincia: {item.province} {'\n'}
        Votos: {item.votes}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={candidates}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
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
});

export default HomeNavigator;
