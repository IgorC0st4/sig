import React from 'react';
import {
  List,
  Surface,
  Title,
} from 'react-native-paper';
import {
  Alert,
  FlatList, View,
} from 'react-native';
import Page from '../../components/Page';
import styles from './styles';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function AgendamentosGeral({ navigation }) {
  const [agendamentos, setAgendamentos] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  const buscarAgendamentos = async () => {
    try {
      setCarregando(true);
      const { data } = await gerenciadorDeRequisicoes.get('/agendamentos/admin');
      setAgendamentos(data);
      setCarregando(false);
    } catch (error) {
      Alert.alert(
        'ERRO',
        'Ocorreu um erro ao buscar os agendamentos. Verifique a sua conexão com a internet para tentar novamente.',
        [
          {
            text: 'Fechar',
            style: 'cancel',
          },
        ],
      );
    }
  };

  const visualizarDetalhesAgendamento = (idAgendamento) => {
    navigation.navigate('Detalhes', { idAgendamento });
  };

  React.useEffect(() => {
    buscarAgendamentos();
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
      <Surface style={styles.centerAlign}>
        {
            agendamentos.length === 0
              ? (
                <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Title>Sem agendamentos</Title>
                </View>
              ) : (

                <FlatList
                  style={styles.fullWidth}
                  keyExtractor={(item, index) => index.toString()}
                  data={agendamentos}
                  renderItem={({ item }) => (
                    <List.Item
                      title={`${new Date(item.dataMarcada).toLocaleDateString()} - ${item.situacao} - ${item.nomeCliente}`}
                      onPress={() => visualizarDetalhesAgendamento(item.id)}
                    />
                  )}
                />
              )
          }
      </Surface>
    </Page>
  );
}

export default AgendamentosGeral;
