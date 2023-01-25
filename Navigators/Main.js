import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeNavigator from './HomeNavigator';
import CandidateNavigator from './CandidateNavigator';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={HomeNavigator}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#1948BA',
          },
          headerTintColor: 'white',
          headerTransparent: true,
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Nuevo candidato"
        component={CandidateNavigator}
        options={{
          headerTintColor: 'white',
          tabBarIcon: ({ color }) => (
            <Icon name="plus" color={color} size={30} />
          ),
          headerStyle: {
            backgroundColor: '#1948BA',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
