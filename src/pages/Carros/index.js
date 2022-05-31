import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FAB,
  Portal,
  Surface,
} from 'react-native-paper';
import {
  FlatList,
} from 'react-native';
import Page from '../../components/Page';
import styles from './styles';
import CarroItem from '../../components/CarroItem';
import RegistrarCarroDialog from '../../components/RegistrarCarroDialog';
import gerenciadorDeRequisicoes from '../../utils/gerenciadorDeRequisicoes';

function Carros({ navigation }) {
  const idUsuario = React.useRef(null);
  const [dialogVisivel, setDialogVisivel] = React.useState(false);
  const [carros, setCarros] = React.useState([]);

  const buscarCarros = async () => {
    try {
      if (!idUsuario.current) {
        idUsuario.current = await AsyncStorage.getItem('idUsuario');
      }
      const params = {
        idDono: idUsuario.current,
      };
      const { data } = await gerenciadorDeRequisicoes.get('/carros', { params });
      setCarros(data);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    buscarCarros();
  }, []);

  const mostrarDialog = () => setDialogVisivel(true);
  const esconderDialog = () => setDialogVisivel(false);

  return (
    <Page back={false} navigation={navigation} title="Carros" customAppBar>
      <Surface style={styles.centerAlign}>

        <FlatList
          style={styles.fullWidth}
          keyExtractor={(item) => item.id.toString()}
          data={carros}
          renderItem={({ item }) => <CarroItem item={item} />}
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
