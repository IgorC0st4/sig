import React from 'react';
import { Appbar } from 'react-native-paper';

function AppBar({
  navigation, back = false, route, title = '',
}) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route ? route.name : title} />
    </Appbar.Header>
  );
}

export default AppBar;
