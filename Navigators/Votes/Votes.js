import React from 'react';
import { View, Text } from 'react-native';

function Votes({ route }) {
  const { candidateRoute, votesRoute } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{candidateRoute.name}</Text>
      <Text>{votesRoute[0].desk}</Text>
    </View>
  );
}

export default Votes;
