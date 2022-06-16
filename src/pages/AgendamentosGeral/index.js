import React from 'react';
import {
  List,
  Surface,
  Title,
} from 'react-native-paper';
import {
  Alert,
  FlatList, RefreshControl, View,
} from 'react-native';
import Page from '../../components/Page';
import styles from './styles';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function AgendamentosGeral({ navigation }) {
  const [atualizando, setAtualizando] = React.useState(false);
  const [agendamentos, setAgendamentos] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  const buscarAgendamentos = async () => {
    try {
      const { data } = await gerenciadorDeRequisicoes.get('/agendamentos/admin');
      setAgendamentos(data);
    } catch (error) {
      console.error(error);
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
  const atualizarLista = React.useCallback(async () => {
    try {
      setAtualizando(true);
      await buscarAgendamentos();
      setAtualizando(false);
    } catch (error) {
      console.error(error);
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
  }, [atualizando]);
  const visualizarDetalhesAgendamento = (idagendamento) => {
    navigation.navigate('Detalhes', { idagendamento });
  };

  React.useEffect(() => {
    const inicializarTela = async () => {
      try {
        setCarregando(true);
        await buscarAgendamentos();
        setCarregando(false);
      } catch (error) {
        console.error(error);
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
    inicializarTela();
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
                  refreshControl={(
                    <RefreshControl refreshing={atualizando} onRefresh={atualizarLista} />
                )}
                  style={styles.fullWidth}
                  keyExtractor={(item, index) => index.toString()}
                  data={agendamentos}
                  renderItem={({ item }) => (
                    <List.Item
                      title={`${new Date(item.datamarcada).toLocaleDateString()} - ${item.situacao} - ${item.nomecliente}`}
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
