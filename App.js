import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import Auth from './Context/store/Auth';
import Main from './Navigators/Main';

export default function App() {
  return (
    <Auth>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Auth>
  );
}
