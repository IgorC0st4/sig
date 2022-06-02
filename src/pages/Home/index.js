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

  const irParaTelaDeAgendamento = () => {
    navigation.navigate('Agendamento');
  };

  const buscarAgendamentos = async () => {
    try {
      const idUsuario = await AsyncStorage.getItem('idUsuario');
      const params = { idUsuario };
      const { data } = await gerenciadorDeRequisicoes.get('/agendamentos/usuario', { params });
      setAgendamentos(data);
      setCarregando(false);
    } catch (error) {
      console.error(error);
    }
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
                  renderItem={() => <List.Item title={new Date().toDateString()} />}
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
