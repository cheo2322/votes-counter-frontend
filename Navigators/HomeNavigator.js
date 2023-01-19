import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';

const HomeNavigator = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/counter_api/v1/candidate`)
      .then((res) => setCandidates(res.data))
      .catch((error) => console.error(error));

    return () => {
      setCandidates();
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
    </View>
  );
};

export default HomeNavigator;
