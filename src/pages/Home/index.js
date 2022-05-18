/* eslint-disable no-unused-vars */
import React from 'react';
import {
  FAB,
  List,
  Surface,
} from 'react-native-paper';
import {
  FlatList,
} from 'react-native';
import Page from '../../components/Page';
import styles from './styles';

function Home({ navigation }) {
  const [agendamentos, setAgendamentos] = React.useState(new Array(5));

  const irParaTelaDeAgendamento = () => {
    navigation.navigate('Agendamento');
  };

  return (
    <Page back={false} navigation={navigation} title="Histórico" customAppBar>
      <Surface style={styles.centerAlign}>
        <FlatList
          style={styles.fullWidth}
          keyExtractor={(item, index) => index.toString()}
          data={agendamentos}
          renderItem={() => <List.Item title={new Date().toDateString()} />}
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
