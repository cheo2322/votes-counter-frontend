import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './Navigators/Main';
import Votes from './Navigators/Votes/Votes';
import PrecinctVotes from './Navigators/Votes/PrecinctVotes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Votes"
          component={Votes}
          options={{ title: 'Votos' }}
        />
        <Stack.Screen
          name="PrecinctVotes"
          component={PrecinctVotes}
          options={{ title: 'Votos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
