import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const [votes, setVotes] = useState();

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .put(
        `http://abcd/counter_api/v1/candidate/63c89e48dd07ce2f83d58ebe/votes/add?votes=1`,
        { headers }
      )
      .then((res) => setVotes(res.data))
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
        } else {
          console.error(error);
        }
      });

    return () => {
      setVotes();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{votes}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
