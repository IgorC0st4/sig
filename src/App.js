import React from 'react';
import { Provider, DarkTheme } from 'react-native-paper';
import Routes from './Routes';

const theme = {
  ...DarkTheme,
};

function App() {
  return (
    <Provider theme={theme}>
      <Routes />
    </Provider>
  );
}

export default App;
