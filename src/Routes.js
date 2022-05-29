import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { DarkTheme } from 'react-native-paper';

import AppBar from './components/AppBar';
import Login from './pages/Login';
import Home from './pages/Home';
import Agendamento from './pages/Agendamento';
import Registrar from './pages/Registrar';
import Perfil from './pages/Perfil';
import Carros from './pages/Carros';

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Historico" options={{ title: 'Histórico', tabBarIcon: 'calendar-clock' }} component={Home} />
      <Tab.Screen name="Carros" options={{ tabBarIcon: 'car' }} component={Carros} />
      <Tab.Screen name="Perfil" options={{ tabBarIcon: 'account' }} component={Perfil} />
    </Tab.Navigator>
  );
}

function Routes() {
  return (
    <NavigationContainer theme={{ ...DarkTheme }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          header: (props) => <AppBar {...props} />,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="Tabs" options={{ headerShown: false }} component={HomeTabs} />
        <Stack.Screen name="Agendamento" component={Agendamento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
