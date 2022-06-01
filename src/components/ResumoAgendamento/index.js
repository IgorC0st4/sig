import React from 'react';
import { View, FlatList } from 'react-native';
import {
  Button,
  Card, DarkTheme, Divider, List, Text, Title,
} from 'react-native-paper';

function ResumoAgendamento({ dataSelecionada, carroSelecionado, servicosSelecionados }) {
  const calcularTotal = () => {
    let total = 0;
    servicosSelecionados.forEach(({ valor }) => {
      total += valor;
    });
    return total;
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
            <List.Item title={`Total: R$${calcularTotal()}`} />
            <Divider />
            <Button style={{ width: '100%' }} mode="contained" color={DarkTheme.colors.accent}>Concluir</Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

export default ResumoAgendamento;
