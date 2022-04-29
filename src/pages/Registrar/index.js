import React from 'react';
import {
  Button,
  Headline, Subheading, Surface, TextInput,
} from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import Page from '../../components/Page';
import styles from './styles';

function Registrar({ navigation }) {
  const efetuarRegistro = () => {
    navigation.dispatch(
      StackActions.replace('Home'),
    );
  };
  const irParaTelaDeLogin = () => {
    navigation.dispatch(
      StackActions.replace('Login'),
    );
  };
  return (
    <Page>
      <Surface style={styles.centerAlign}>
        <Headline>Bem-vindo!</Headline>
        <Subheading>Preencha os dados abaixo para registrar-se</Subheading>

        <TextInput
          style={styles.fullWidth}
          label="Email"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.fullWidth}
          label="Telefone"
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.fullWidth}
          label="Senha"
        />
        <TextInput
          style={styles.fullWidth}
          label="Confirmar Senha"
        />

        <Button
          mode="contained"
          style={styles.fullWidth}
          onPress={() => efetuarRegistro()}
        >
          Registrar-se
        </Button>
        <Button
          style={styles.fullWidth}
          onPress={() => irParaTelaDeLogin()}
        >
          Fazer login
        </Button>
      </Surface>
    </Page>
  );
}

export default Registrar;
