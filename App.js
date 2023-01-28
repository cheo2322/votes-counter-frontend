import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './Context/store/Auth';

import Main from './Navigators/Main';
import AddVotes from './Navigators/Votes/AddVotes';
import DetailedVotes from './Navigators/Votes/DetailedVotes';
import Votes from './Navigators/Votes/Votes';
import Login from './Screens/User/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Auth>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
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
          <Stack.Screen
            name="AddVotes"
            component={AddVotes}
            options={{ title: 'Agregar votos' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Auth>
  );
}
