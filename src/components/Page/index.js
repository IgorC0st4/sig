import React from 'react';
import { SafeAreaView } from 'react-native';
import { Surface } from 'react-native-paper';
import styles from './styles';
import AppBar from '../AppBar';

function Page({
  children, style = {}, navigation, back, title, customAppBar = false,
}) {
  return (
    <SafeAreaView style={styles.background}>
      {customAppBar && <AppBar navigation={navigation} back={back} title={title} />}
      <Surface style={{ ...styles.background, ...style }}>
        {children}
      </Surface>
    </SafeAreaView>
  );
}

export default Page;
