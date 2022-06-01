import React from 'react';
import DatePicker from 'react-native-date-picker';
import {
  Button, DarkTheme, Surface, Title,
} from 'react-native-paper';

function SelecionarData({ selecionarData }) {
  const [dataSelecionada, setDataSelecionada] = React.useState(new Date());
  const [dataEhValida, setDataEhValida] = React.useState(true);
  const verificarData = () => {
    setDataEhValida(dataSelecionada.getDay() !== 0);
    if (dataSelecionada.getDay() !== 0) {
      selecionarData(dataSelecionada);
    }
  };
  return (
    <Surface style={{
      height: '100%', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Title>Selecione o dia</Title>
      {!dataEhValida && <Title style={{ color: 'red', textAlign: 'center' }}>Não funcionamos aos domingos</Title>}
      <DatePicker
        minimumDate={new Date()}
        date={dataSelecionada}
        onDateChange={(novaData) => setDataSelecionada(novaData)}
        mode="date"
        textColor="white"
        theme="dark"
        androidVariant="nativeAndroid"
      />
      <Button onPress={() => verificarData()} mode="contained" color={DarkTheme.colors.accent}>Confirmar</Button>
    </Surface>
  );
}

export default SelecionarData;
