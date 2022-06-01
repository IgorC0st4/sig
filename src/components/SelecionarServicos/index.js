import React from 'react';
import { FlatList, View } from 'react-native';
import {
  Button, Switch, Title, Text, DarkTheme, Snackbar,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function SelecionarServicos({ tamanho, selecionarServicos }) {
  const [mostrarSnack, setMostrarSnack] = React.useState(false);
  const [carregando, setCarregando] = React.useState(true);
  const [servicos, setServicos] = React.useState([]);
  const {
    control, handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const buscarServicos = async () => {
    try {
      const params = { tamanho };
      const { data } = await gerenciadorDeRequisicoes('variacoes/agendamento', { params });
      setServicos(data);
      setCarregando(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    buscarServicos();
  }, []);

  const resultado = (valores) => {
    const servicosSelecionados = [];
    Object.entries(valores).forEach(([index, selecionado]) => {
      if (selecionado) {
        servicosSelecionados.push(servicos[parseInt(index, 10)]);
      }
    });
    if (servicosSelecionados.length === 0) {
      setMostrarSnack(true);
    } else {
      selecionarServicos(servicosSelecionados);
    }
  };

  if (carregando) {
    return (
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Title>Carregando...</Title>
      </View>
    );
  }
  return (
    <View>
      <Title>Selecione os serviços desejados</Title>
      <FlatList
        style={{ height: '90%' }}
        keyExtractor={(item) => item.idVariacao}
        data={servicos}
        renderItem={({ item, index }) => (
          <Controller
            control={control}
            name={index.toString()}
            render={({ field: { onChange, value } }) => (
              <View style={{
                display: 'flex', flexDirection: 'row', marginBottom: 20,
              }}
              >
                <Text style={{ flex: 1, fontSize: 16 }}>
                  {item.nomeServico}
                  {' '}
                  - R$
                  {item.valor}
                </Text>
                <Switch
                  value={value}
                  onValueChange={onChange}
                />
              </View>
            )}
          />
        )}
      />
      <Button onPress={handleSubmit(resultado)} mode="contained" color={DarkTheme.colors.accent}>Continuar</Button>
      <Snackbar
        visible={mostrarSnack}
        onDismiss={() => setMostrarSnack(false)}
        duration={3000}
        style={{ backgroundColor: DarkTheme.colors.error }}
      >
        Selecione ao menos um serviço
      </Snackbar>
    </View>
  );
}

export default SelecionarServicos;
