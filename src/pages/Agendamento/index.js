import React from 'react';
import {
  Button, Surface, Headline, Text, Checkbox, Title, Colors,
} from 'react-native-paper';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import Page from '../../components/Page';
import styles from './styles';

function Agendamento({ navigation }) {
  const [dataSelecionada, setDataSelecionada] = React.useState(new Date());
  const [visivel, setVisivel] = React.useState(false);
  const [selecionouData, setSelecionouData] = React.useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = React.useState();
  const [dataValida, setDataValida] = React.useState();

  const abrirDataModal = () => setVisivel(true);
  const fecharDataModal = () => setVisivel(false);

  const selecionarData = (novaData) => {
    const aux = new Date(novaData);
    setDataValida(aux.getDay() !== 0);
    setDataSelecionada(new Date(novaData));
    setSelecionouData(true);
    setVisivel(false);
  };

  return (
    <Page navigation={navigation}>
      <Surface style={styles.fundo}>
        <View>
          <Button onPress={() => abrirDataModal()} mode="contained">Escolher data</Button>
          <DatePicker
            modal
            open={visivel}
            minimumDate={new Date()}
            date={dataSelecionada}
            onConfirm={(novaData) => selecionarData(novaData)}
            onCancel={() => fecharDataModal()}
            mode="date"
            title="Escolha o dia de interesse"
            confirmText="Confirmar"
            cancelText="Cancelar"
            textColor="white"
            theme="dark"
          />
          {selecionouData && (
            <View>
              <Title style={{ textAlign: 'center' }}>
                Data selecionada:
                {' '}
                {dataSelecionada.toLocaleDateString('dd/MM/yyyy')}
              </Title>
              {!dataValida && <Title style={{ color: 'red', textAlign: 'center' }}>Não funcionamos aos domingos</Title>}
            </View>
          )}
        </View>
      </Surface>
    </Page>
  );
}

export default Agendamento;
