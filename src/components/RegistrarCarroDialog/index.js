import React from 'react';
import {
  Button, Dialog, TextInput, RadioButton, Text, Headline,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import styles from './styles';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function RegistrarCarroDialog({
  visivel, esconderDialog, atualizarLista, idUsuario,
}) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
  });

  const registrarCarro = async (valores) => {
    try {
      console.log({ valores, idUsuario });
      await gerenciadorDeRequisicoes.post('/carros', Object.assign(valores, { idDono: idUsuario }));
      atualizarLista();
      esconderDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog visible={visivel} onDismiss={esconderDialog}>
      <Dialog.Title>Novo Carro</Dialog.Title>
      <Dialog.Content>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 7,
            maxLength: 10,
          }}
          render={({
            field: {
              onChange, onBlur, value,
            },
          }) => (
            <TextInput
              style={styles.input}
              error={errors.placa}
              label="Placa"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="placa"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({
            field: {
              onChange, onBlur, value,
            },
          }) => (
            <TextInput
              style={styles.input}
              error={errors.modelo}
              label="Modelo"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="modelo"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              error={errors.cor}
              label="Cor"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="cor"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          name="tamanho"
          render={({ field: { onChange, value } }) => (
            <View>
              <Headline>Tamanho</Headline>
              <RadioButton.Group onValueChange={onChange} value={value}>
                <View>
                  <Text>PEQUENO</Text>
                  <RadioButton value="PEQUENO" />
                </View>
                <View>
                  <Text>MÉDIO</Text>
                  <RadioButton value="MÉDIO" />
                </View>
                <View>
                  <Text>GRANDE</Text>
                  <RadioButton value="GRANDE" />
                </View>
              </RadioButton.Group>
            </View>
          )}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => esconderDialog()}>Cancelar</Button>
        <Button type="submit" onPress={handleSubmit(registrarCarro)}>Salvar</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default RegistrarCarroDialog;
