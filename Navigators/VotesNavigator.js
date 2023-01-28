import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainVotes from '../Screens/Votes/MainVotes';
import BasicVotes from '../Screens/Votes/BasicVotes';
import DetailedVotes from '../Screens/Votes/DetailedVotes';
import AddVotes from '../Screens/Votes/AddVotes';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainVotes"
        component={MainVotes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BasicVotes"
        component={BasicVotes}
        options={{ title: 'Votos' }}
      />
      <Stack.Screen
        name="DetailedVotes"
        component={DetailedVotes}
        options={{ title: 'Votos' }}
      />
      <Stack.Screen
        name="AddVotes"
        component={AddVotes}
        options={{ title: 'Agregar votos' }}
      />
    </Stack.Navigator>
  );
}

export default function VotesNavigator() {
  return <MyStack />;
}
