import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card, DarkTheme, Divider, List, Snackbar, Text, Title,
} from 'react-native-paper';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function ResumoAgendamento({
  dataSelecionada, carroSelecionado, servicosSelecionados, navigation,
}) {
  const [mostrarSnack, setMostrarSnack] = React.useState(false);
  const [registrandoAgendamento, setRegistrandoAgendamento] = React.useState(false);
  const [orcamento, setOrcamento] = React.useState(0);
  const [horasservico, setHorasservico] = React.useState(0);

  const calcularOrcamento = () => {
    let total = 0;
    servicosSelecionados.forEach(({ valor }) => {
      total += valor;
    });
    setOrcamento(total);
  };

  const calcularHorasServico = () => {
    let total = 0;
    servicosSelecionados.forEach(({ duracaoservico }) => {
      total += duracaoservico;
    });
    setHorasservico(total);
  };

  React.useEffect(() => {
    calcularHorasServico();
    calcularOrcamento();
  }, []);

  const registrarAgendamento = async () => {
    try {
      setRegistrandoAgendamento(true);
      const postData = {
        dataSelecionada,
        carroSelecionado,
        servicosSelecionados,
        orcamento,
        horasservico,
      };
      await gerenciadorDeRequisicoes.post('/agendamentos', postData);
      setMostrarSnack(true);
      setRegistrandoAgendamento(false);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'ERRO',
        'Ocorreu um erro ao registrar o agendamento. Verifique os dados inseridos e a sua conexão com a internet para tentar novamente.',
        [
          {
            text: 'Fechar',
            style: 'cancel',
          },
        ],
      );
    }
  };

  const onDismissSnackBar = () => {
    navigation.goBack();
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
              keyExtractor={(item) => item.idvariacao.toString()}
              data={servicosSelecionados}
              renderItem={({ item }) => (
                <Text>
                  {item.nomeservico}
                  {' '}
                  - R$
                  {item.valor}
                </Text>
              )}
            />
            <Divider />
            <Title>
              Total: R$
              {orcamento}
            </Title>
            <Title>
              Expectativa de horas:
              {horasservico}
            </Title>
            <Divider />
            <Title style={{ textAlign: 'justify', margin: 15 }}>
              OBS: o &quot;Total&quot; e &quot;Expectativa de horas&quot; aqui apresentados são apenas estimativas.
              Para o valor final e período de tempo dos serviços é necessário uma inspeção do veículo.
            </Title>
            <Divider style={{ marginBottom: 15 }} />
            {
              registrandoAgendamento
                ? (
                  <ActivityIndicator />
                )
                : (

                  <Button
                    style={{ width: '100%' }}
                    mode="contained"
                    color={DarkTheme.colors.accent}
                    onPress={() => registrarAgendamento()}
                    disabled={mostrarSnack}
                  >
                    Concluir
                  </Button>
                )
            }
          </View>
        </Card.Content>
      </Card>
      <Snackbar
        duration={3000}
        visible={mostrarSnack}
        onDismiss={onDismissSnackBar}
      >
        Seu agendamento foi marcado com sucesso!
      </Snackbar>
    </View>
  );
}

export default ResumoAgendamento;
