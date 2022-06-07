import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FAB,
  List,
  Surface,
  Title,
} from 'react-native-paper';
import {
  FlatList, View,
} from 'react-native';
import Page from '../../components/Page';
import styles from './styles';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function Home({ navigation }) {
  const [agendamentos, setAgendamentos] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);
  const atualizarHome = React.useRef(false);

  const buscarAgendamentos = async () => {
    try {
      setCarregando(true);
      const idUsuario = await AsyncStorage.getItem('idUsuario');
      const params = { idUsuario };
      const { data } = await gerenciadorDeRequisicoes.get('/agendamentos/usuario', { params });
      setAgendamentos(data);
      setCarregando(false);
    } catch (error) {
      console.error(error);
    }
  };

  const visualizarDetalhesAgendamento = (idAgendamento) => {
    navigation.navigate('Detalhes', { idAgendamento });
  };

  React.useEffect(() => {
    buscarAgendamentos();
  }, [atualizarHome.current]);

  const irParaTelaDeAgendamento = () => {
    navigation.navigate('Agendamento', { atualizarHome: atualizarHome.current });
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
    <Page back={false} navigation={navigation} title="Histórico" customAppBar>
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
                      title={`${new Date(item.dataMarcada).toLocaleDateString()} - ${item.situacao}`}
                      onPress={() => visualizarDetalhesAgendamento(item.id)}
                    />
                  )}
                />
              )
          }
      </Surface>
      <FAB
        style={styles.fab}
        icon="calendar"
        onPress={() => irParaTelaDeAgendamento()}
      />
    </Page>
  );
}

export default Home;
