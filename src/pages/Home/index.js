import React from 'react';
import {
  FAB,
  Surface,
} from 'react-native-paper';
import {
  FlatList,
} from 'react-native';
import Page from '../../components/Page';
import styles from './styles';
import CardServico from '../../components/CardServico';

function Home({ navigation }) {
  const servicos = Array(15);

  const irParaTelaDeAgendamento = () => {
    navigation.navigate('Agendamento');
  };

  return (
    <Page>
      <Surface style={styles.centerAlign}>
        <FlatList
          style={styles.fullWidth}
          keyExtractor={(item, index) => index.toString()}
          data={servicos}
          renderItem={({ item }) => <CardServico item={item} />}
        />
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
