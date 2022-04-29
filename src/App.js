import React from 'react';
import { Provider, DefaultTheme } from 'react-native-paper';
import Routes from './Routes';

const theme = {
  ...DefaultTheme,
};

function App() {
  return (
    <Provider theme={theme}>
      <Routes />
    </Provider>
  );
}

export default App;
