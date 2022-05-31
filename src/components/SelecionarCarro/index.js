import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, FlatList } from 'react-native';
import {
  Button, Caption, Colors, Headline, RadioButton, Text,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function SelecionarCarro({ selecionarCarro }) {
  const idUsuario = React.useRef(null);
  const [carros, setCarros] = React.useState([]);
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
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    buscarCarros();
  }, []);

  return (
    <View style={{ height: '100%' }}>
      {
            carros.length === 0
              ? <Headline>Cadastre pelo menos um carro antes de fazer um agendamento</Headline>
              : (
                <View>

                  <Headline>Selecione o carro</Headline>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="carro"
                    render={({ field: { onChange, value } }) => (
                      <RadioButton.Group onValueChange={onChange} value={value}>
                        <FlatList
                          data={carros}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={
                              ({ item }) => (
                                <View>
                                  <Text>{item.placa}</Text>
                                  <RadioButton value={item} />
                                </View>
                              )
                            }
                        />
                      </RadioButton.Group>
                    )}
                  />
                  {
                  errors.carro && (
                  <Caption style={{ color: Colors.red300 }}>Selecione um carro</Caption>
                  )
                  }
                  <Button type="submit" onPress={handleSubmit(selecionarCarro)}>Confirmar</Button>
                </View>
              )
            }
    </View>
  );
}

export default SelecionarCarro;
