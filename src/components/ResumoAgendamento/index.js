import React from 'react';
import { View, FlatList } from 'react-native';
import {
  Button,
  Card, DarkTheme, Divider, List, Text, Title,
} from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function ResumoAgendamento({
  dataSelecionada, carroSelecionado, servicosSelecionados, navigation,
}) {
  const [orcamento, setOrcamento] = React.useState(0);
  const [horasServico, setHorasServico] = React.useState(0);

  const calcularOrcamento = () => {
    let total = 0;
    servicosSelecionados.forEach(({ valor }) => {
      total += valor;
    });
    setOrcamento(total);
  };

  const calcularHorasServico = () => {
    let total = 0;
    servicosSelecionados.forEach(({ duracaoServico }) => {
      total += duracaoServico;
    });
    setHorasServico(total);
  };

  React.useEffect(() => {
    calcularHorasServico();
    calcularOrcamento();
  }, []);

  const registrarAgendamento = async () => {
    try {
      const postData = {
        dataSelecionada,
        carroSelecionado,
        servicosSelecionados,
        orcamento,
        horasServico,
      };
      await gerenciadorDeRequisicoes.post('agendamentos', postData);
      navigation.dispatch(
        StackActions.replace('Tabs'),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Card>
        <Card.Title title="Resumo do agendamento" />
        <Card.Content>
          <View style={{ marginBottom: 15 }}>
            <Title>Data</Title>
            <Text>{dataSelecionada.toLocaleDateString()}</Text>
            <Divider />
          </View>
          <View style={{ marginBottom: 15 }}>
            <Title>Carro</Title>
            <Text>{`Placa: ${carroSelecionado.placa}`}</Text>
            <Text>{`Modelo: ${carroSelecionado.modelo}`}</Text>
            <Text>{`Cor: ${carroSelecionado.cor}`}</Text>
            <Text>{`Tamanho: ${carroSelecionado.tamanho}`}</Text>
            <Divider />
          </View>
          <View style={{ marginBottom: 15 }}>
            <Title>Serviços</Title>
            <FlatList
              keyExtractor={(item) => item.idVariacao.toString()}
              data={servicosSelecionados}
              renderItem={({ item }) => (
                <List.Item
                  title={`${item.nomeServico} - R$${item.valor}`}
                />
              )}
            />
            <List.Item title={`Total: R$${orcamento}`} />
            <List.Item title={`Expectativa de horas: ${horasServico}`} />
            <Divider />
            <Button
              style={{ width: '100%' }}
              mode="contained"
              color={DarkTheme.colors.accent}
              onPress={() => registrarAgendamento()}
            >
              Concluir
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

export default ResumoAgendamento;
