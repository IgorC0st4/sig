import React from 'react';
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

function Carros() {
  const [dialogVisivel, setDialogVisivel] = React.useState(false);
  const [carros, setCarros] = React.useState([]);

  const atualizarLista = () => {
    setCarros((antigo) => [...antigo, {
      placa: 'placa', cor: 'cor', tamanho: 'tamaho', modelo: 'modelo',
    }]);
  };

  const mostrarDialog = () => setDialogVisivel(true);
  const esconderDialog = () => setDialogVisivel(false);

  return (
    <Page>
      <Surface style={styles.centerAlign}>
        <FlatList
          style={styles.fullWidth}
          keyExtractor={(item, index) => index.toString()}
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
          hideDialog={esconderDialog}
          visible={dialogVisivel}
          atualizarLista={atualizarLista}
        />
      </Portal>
    </Page>
  );
}

export default Carros;
