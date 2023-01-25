import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './Navigators/Main';
import DetailedVotes from './Navigators/Votes/DetailedVotes';
import Votes from './Navigators/Votes/Votes';

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
          name="DetailedVotes"
          component={DetailedVotes}
          options={{ title: 'Votos' }}
        />
        <Stack.Screen
          name="Votes"
          component={Votes}
          options={{ title: 'Votos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
