import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, FlatList, Alert } from 'react-native';
import {
  Button, Colors, Headline, RadioButton, Text, Title,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function SelecionarCarro({ selecionarCarro }) {
  const idUsuario = React.useRef(null);
  const [carros, setCarros] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
  });

  const buscarCarros = async () => {
    try {
      if (!idUsuario.current) {
        idUsuario.current = await AsyncStorage.getItem('idUsuario');
      }
      const params = {
        idDono: idUsuario.current,
      };
      const { data } = await gerenciadorDeRequisicoes.get('/carros', { params });
      setCarros(data);
      setCarregando(false);
    } catch (error) {
      Alert.alert(
        'ERRO',
        'Ocorreu um erro ao buscar os carros registrados. Verifique a sua conexão com a internet para tentar novamente.',
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
    buscarCarros();
  }, []);

  const selecionarCarroNaLista = (props) => {
    selecionarCarro(carros[props.index]);
  };

  if (carregando) {
    return (
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Title>Carregando...</Title>
      </View>
    );
  }
  return (
    <View style={{ height: '100%' }}>
      {carregando}
      {
              carros.length === 0
                ? <Headline>Cadastre pelo menos um carro antes de fazer um agendamento</Headline>
                : (
                  <View>

                    <Headline>Selecione o carro</Headline>
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="index"
                      render={({ field: { onChange, value } }) => (
                        <RadioButton.Group onValueChange={onChange} value={value}>
                          <FlatList
                            data={carros}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={
                                ({ item, index }) => (
                                  <RadioButton.Item label={item.modelo} value={index} />
                                )
                              }
                          />
                        </RadioButton.Group>
                      )}
                    />
                    {
                    errors.index && (
                    <Text style={{ color: Colors.red300 }}>Selecione um carro</Text>
                    )
                    }
                    <Button type="submit" mode="contained" onPress={handleSubmit(selecionarCarroNaLista)}>Confirmar</Button>
                  </View>
                )
              }
    </View>
  );
}

export default SelecionarCarro;
