import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FAB,
  Portal,
  Surface,
  Title,
} from 'react-native-paper';
import {
  Alert,
  FlatList,
  View,
} from 'react-native';
import Page from '../../components/Page';
import styles from './styles';
import CarroItem from '../../components/CarroItem';
import RegistrarCarroDialog from '../../components/RegistrarCarroDialog';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function Carros({ navigation }) {
  const idUsuario = React.useRef(null);
  const [carregando, setCarregando] = React.useState(true);
  const [dialogVisivel, setDialogVisivel] = React.useState(false);
  const [carros, setCarros] = React.useState([]);

  const buscarCarros = async () => {
    try {
      setCarregando(true);
      if (!idUsuario.current) {
        idUsuario.current = await AsyncStorage.getItem('idUsuario');
      }
      const params = {
        iddono: idUsuario.current,
      };
      const { data } = await gerenciadorDeRequisicoes.get('/carros', { params });
      setCarros(data);
      setCarregando(false);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'ERRO',
        'Ocorreu um erro ao buscar os carros registrados. Verifique a sua conexão com a internet para tentar novamente.',
        [
          {
            text: 'Fechar',
            style: 'cancel',
          },
        ],
      );
    }
  };

  const excluirCarro = async (id) => {
    try {
      await gerenciadorDeRequisicoes.delete(`/carros/${id}`);
      buscarCarros();
    } catch (error) {
      console.error(error);
      Alert.alert(
        'ERRO',
        'Ocorreu um erro ao excluir o carro. Verifique a sua conexão com a internet para tentar novamente.',
        [
          {
            text: 'Fechar',
            style: 'cancel',
          },
        ],
      );
    }
  };

  React.useEffect(() => {
    buscarCarros();
  }, []);

  const mostrarDialog = () => setDialogVisivel(true);
  const esconderDialog = () => setDialogVisivel(false);

  if (carregando) {
    return (
      <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Title>Carregando...</Title>
      </View>
    );
  }
  return (
    <Page back={false} navigation={navigation} title="Carros" customAppBar>
      <Surface style={styles.centerAlign}>

        <FlatList
          style={styles.fullWidth}
          keyExtractor={(item) => item.id.toString()}
          data={carros}
          renderItem={({ item }) => <CarroItem item={item} excluirCarro={excluirCarro} />}
        />
      </Surface>
      <FAB
        style={styles.fab}
        icon="plus-circle"
        onPress={() => mostrarDialog()}
      />
      <Portal>
        <RegistrarCarroDialog
          esconderDialog={esconderDialog}
          visivel={dialogVisivel}
          atualizarLista={buscarCarros}
          idUsuario={idUsuario.current}
        />
      </Portal>
    </Page>
  );
}

export default Carros;
