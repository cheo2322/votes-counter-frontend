import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

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
      .get(`http://192.168.100.8:8080/counter_api/v1/candidate`)
      .then((res) => setCandidates(res.data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getCandidates();

    return () => {
      setCandidates();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {candidates.map((item, key) => (
          <Text key={key}>
            Candidato: {item.name} {item.lastName} {'\n'}
            Delegaci&oacute;n: {item.position} {'\n'}
            Lista: {item.list} {'\n'}
            Ciudad: {item.city} {'\n'}
            Provincia: {item.province} {'\n'}
            Votos: {item.votes}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeNavigator;
