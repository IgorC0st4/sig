import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login';
import Home from './pages/Home';
import Agendamento from './pages/Agendamento';
import Registrar from './pages/Registrar';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Agendamento" component={Agendamento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
