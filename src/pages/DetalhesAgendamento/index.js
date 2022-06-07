import React from 'react';
import { View, FlatList } from 'react-native';
import {
  Card, Divider, List, Text, Title,
} from 'react-native-paper';
import Page from '../../components/Page';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function DetalhesAgendamento({
  route,
}) {
  const [carregando, setCarregando] = React.useState(true);
  const [agendamento, setAgendamento] = React.useState({});
  const [carroSelecionado, setCarroSelecionado] = React.useState({});
  const [servicosSelecionados, setServicosSelecionados] = React.useState([]);
  const [horasServico, setHorasServico] = React.useState(0);

  const calcularHorasServico = () => {
    let total = 0;
    servicosSelecionados.forEach(({ duracao }) => {
      total += duracao;
    });
    setHorasServico(total);
  };

  const buscarDetalhes = async () => {
    try {
      const params = { idAgendamento: route.params.idAgendamento };
      const { data } = await gerenciadorDeRequisicoes.get('/agendamentos/usuario/detalhes', { params });
      console.log(data);
      setAgendamento(data.agendamento);
      setCarroSelecionado(data.carroSelecionado);
      setServicosSelecionados(data.servicosSelecionados);
    } catch (error) {
      console.error(error);
    }
  };

  const prepararDadosDeExibicao = async () => {
    try {
      await buscarDetalhes();
      calcularHorasServico();
      setCarregando(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    prepararDadosDeExibicao();
  }, []);

  if (carregando) {
    return (
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Title>Carregando...</Title>
      </View>
    );
  }

  return (
    <Page>
      <Card>
        <Card.Title title="Resumo do agendamento" />
        <Card.Content>
          <View style={{ marginBottom: 15 }}>
            <Title>Data</Title>
            <Text>{new Date(agendamento.dataMarcada).toLocaleDateString()}</Text>
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
              keyExtractor={(item, index) => index.toString()}
              data={servicosSelecionados}
              renderItem={({ item }) => (
                <List.Item
                  title={`${item.nome} - R$${item.valor}`}
                />
              )}
            />
            <List.Item title={`Total: R$${agendamento.orcamento}`} />
            <List.Item title={`Expectativa de horas: ${horasServico}`} />
            <Divider />
          </View>
          <View style={{ marginBottom: 15 }}>
            <Title>Situação</Title>
            <Text>{agendamento.situacao}</Text>
            <Divider />
          </View>
        </Card.Content>
      </Card>
    </Page>
  );
}

export default DetalhesAgendamento;
