import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  Headline, Subheading, Surface, TextInput,
} from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Alert } from 'react-native';
import Page from '../../components/Page';
import styles from './styles';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function Login({ navigation }) {
  const {
    control, handleSubmit, formState: { errors },
  } = useForm();
  const irParaHistorico = async () => {
    try {
      const tipoUsuario = await AsyncStorage.getItem('tipo');
      navigation.dispatch(
        StackActions.replace(tipoUsuario === 'CLIENTE' ? 'Tabs' : 'Agendamentos'),
      );
    } catch (error) {
      console.error(error);
      Alert.alert(
        'ERRO',
        'Ocorreu um erro ao buscar os seus dados. Abra o aplicativo novamente ou tente limpar o cache.',
        [
          {
            text: 'Fechar',
            style: 'cancel',
          },
        ],
      );
    }
  };

  const verificarUsuarioJaLogado = async () => {
    try {
      const idUsuario = await AsyncStorage.getItem('idUsuario');
      if (idUsuario != null) {
        irParaHistorico();
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'ERRO',
        'Ocorreu um erro ao buscar os seus dados. Abra o aplicativo novamente ou tente limpar o cache.',
        [
          {
            text: 'Fechar',
            style: 'cancel',
          },
        ],
      );
    }
  };
  React.useEffect(() => {
    verificarUsuarioJaLogado();
  }, []);

  const efetuarLogin = async (valores) => {
    try {
      const { data } = await gerenciadorDeRequisicoes.post('/usuarios/entrar', valores);
      await AsyncStorage.setItem('idUsuario', `${data.id}`);
      await AsyncStorage.setItem('tipo', `${data.tipo}`);
      navigation.dispatch(
        StackActions.replace(data.tipo === 'CLIENTE' ? 'Tabs' : 'Agendamentos'),
      );
    } catch (error) {
      console.error(error);
      Alert.alert(
        'ERRO',
        'Ocorreu um erro ao efetuar o login. Verifique os dados inseridos e a conexão com a internet.',
        [
          {
            text: 'Fechar',
            style: 'cancel',
          },
        ],
      );
    }
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

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /[@]+/g,
          }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.fullWidth}
              label="Email"
              keyboardType="email-address"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.email}
            />
          )}
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="senha"
          render={({ field: { onChange, onBlur, value } }) => (

            <TextInput
              style={styles.fullWidth}
              secureTextEntry
              label="Senha"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.senha}
            />
          )}
        />

        <Button
          mode="contained"
          style={styles.fullWidth}
          onPress={handleSubmit(efetuarLogin)}
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
