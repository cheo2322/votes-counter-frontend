import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import VotesNavigator from './VotesNavigator';
import CandidateNavigator from './CandidateNavigator';
import UserNavigator from './UserNavigator';

import AuthGlobal from '../Context/store/AuthGlobal';

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={VotesNavigator}
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

      {context.stateUser.isAuthenticated ? (
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
      ) : null}

      <Tab.Screen
        name="Usuario"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
