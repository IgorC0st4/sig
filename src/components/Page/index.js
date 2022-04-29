import React from 'react';
import { SafeAreaView } from 'react-native';
import { Surface } from 'react-native-paper';
import styles from './styles';

function Page({ children, style = {} }) {
  return (
    <SafeAreaView style={styles.background}>
      <Surface style={{ ...styles.background, ...style }}>
        {children}
      </Surface>
    </SafeAreaView>
  );
}

export default Page;
