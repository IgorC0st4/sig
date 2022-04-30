import React from 'react';
import {
  Button,
  Headline, Subheading, Surface, TextInput,
} from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import Page from '../../components/Page';
import styles from './styles';

function Login({ navigation }) {
  const efetuarLogin = () => {
    navigation.dispatch(
      StackActions.replace('Tabs'),
    );
  };

  const irParaTelaDeRegistro = () => {
    navigation.dispatch(
      StackActions.replace('Registrar'),
    );
  };
  return (
    <Page>
      <Surface style={styles.centerAlign}>
        <Headline>Bem-vindo!</Headline>
        <Subheading>Preencha os dados abaixo para fazer login</Subheading>

        <TextInput
          style={styles.fullWidth}
          label="Email"
          type="email"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.fullWidth}
          label="Senha"
          type="password"
        />

        <Button
          mode="contained"
          style={styles.fullWidth}
          onPress={() => efetuarLogin()}
        >
          Entrar
        </Button>
        <Button
          style={styles.fullWidth}
          onPress={() => irParaTelaDeRegistro()}
        >
          Registrar-se
        </Button>
      </Surface>
    </Page>
  );
}

export default Login;
