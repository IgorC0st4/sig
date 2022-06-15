import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button, TextInput, Surface, Headline,
} from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Alert } from 'react-native';
import Page from '../../components/Page';
import styles from './styles';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function Perfil({ navigation }) {
  const idUsuario = React.useRef(null);
  const usuario = React.useRef(null);
  const {
    control, handleSubmit, formState: { errors }, setValue, setError,
  } = useForm();

  const popularDados = () => {
    Object.keys(usuario.current).forEach((key) => {
      setValue(key, usuario.current[key]);
    });
  };

  const buscarDados = async () => {
    try {
      idUsuario.current = await AsyncStorage.getItem('idUsuario');
      const params = { id: idUsuario.current };
      const { data } = await gerenciadorDeRequisicoes.get('/usuarios', { params });
      usuario.current = data[0];
      popularDados();
    } catch (error) {
      Alert.alert(
        'ERRO',
        'Ocorreu um erro ao buscar os seus dados. Verifique a conexão com a internet.',
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
    buscarDados();
  }, []);

  const atualizarDados = async (valores) => {
    const dadosParaAtualizar = { id: valores.id };
    if (valores.senha && valores.senha.trim().length > 0) {
      if (!valores.confirmarSenha) {
        setError('confirmarSenha', { type: 'required', message: 'Confirme a senha' }, { shouldFocus: true });
        return;
      }
      if (valores.senha.trim() === valores.confirmarSenha.trim()
      ) {
        dadosParaAtualizar.senha = valores.senha.trim();
      } else {
        setError('confirmarSenha', { type: 'required', message: 'Confirme a senha' }, { shouldFocus: true });
        return;
      }
    }
    if (valores.telefone !== usuario.current.telefone) {
      dadosParaAtualizar.telefone = valores.telefone;
    }
    if (Object.keys(dadosParaAtualizar).length > 1) {
      try {
        await gerenciadorDeRequisicoes.put('/usuarios', dadosParaAtualizar);
        usuario.current = Object.assign(usuario.current, dadosParaAtualizar);
      } catch (error) {
        Alert.alert(
          'ERRO',
          'Ocorreu um erro ao atualizar os seus dados. Verifique os dados inseridos e a sua conexão com a internet.',
          [
            {
              text: 'Fechar',
              style: 'cancel',
            },
          ],
        );
      }
    }
  };
  const sair = async () => {
    try {
      await AsyncStorage.removeItem('idUsuario');
      navigation.dispatch(
        StackActions.replace('Login'),
      );
    } catch (error) {
      Alert.alert(
        'ERRO',
        'Ocorreu um erro ao limpar os seus dados. Feche o aplicativo ou tente limpar o cache.',
        [
          {
            text: 'Fechar',
            style: 'cancel',
          },
        ],
      );
    }
  };
  return (
    <Page navigation={navigation} title="Perfil" customAppBar>

      <Surface style={styles.centerAlign}>
        <Headline>Atualize os seus dados</Headline>
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.fullWidth}
              label="Nome"
              disabled
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
              disabled
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
          onPress={handleSubmit(atualizarDados)}
        >
          Atualizar Dados
        </Button>
        <Button
          style={styles.fullWidth}
          onPress={() => sair()}
        >
          Sair
        </Button>
      </Surface>
    </Page>
  );
}

export default Perfil;
