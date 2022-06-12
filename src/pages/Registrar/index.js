import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  Headline, Subheading, Surface, TextInput,
} from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Page from '../../components/Page';
import styles from './styles';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function Registrar({ navigation }) {
  const {
    control, handleSubmit, formState: { errors }, setError,
  } = useForm();

  const irParaTelaDeLogin = () => {
    navigation.dispatch(
      StackActions.replace('Login'),
    );
  };

  const efetuarRegistro = async (valores) => {
    if (valores.senha !== valores.confirmarSenha) {
      setError('confirmarSenha');
      return;
    }
    try {
      const { data } = await gerenciadorDeRequisicoes.post('/usuarios/registrar', valores);
      await AsyncStorage.setItem('idUsuario', `${data.id}`);
      await AsyncStorage.setItem('tipo', `${data.tipo}`);
      navigation.dispatch(
        StackActions.replace('Tabs'),
      );
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  return (
    <Page>
      <Surface style={styles.centerAlign}>
        <Headline>Bem-vindo!</Headline>
        <Subheading>Preencha os dados abaixo para registrar-se</Subheading>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="nome"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.fullWidth}
              label="Nome"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.nome}
            />
          )}
        />
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
            minLength: 11,
            maxLength: 14,
          }}
          name="telefone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.fullWidth}
              label="Telefone"
              keyboardType="phone-pad"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.telefone}
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

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="confirmarSenha"
          render={({ field: { onChange, onBlur, value } }) => (

            <TextInput
              style={styles.fullWidth}
              secureTextEntry
              label="Confirmar Senha"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.confirmarSenha}
            />
          )}
        />

        <Button
          mode="contained"
          style={styles.fullWidth}
          onPress={handleSubmit(efetuarRegistro)}
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
