import React from 'react';
import { Surface } from 'react-native-paper';
import Page from '../../components/Page';
import styles from './styles';

import SelecionarCarro from '../../components/SelecionarCarro';
import SelecionarData from '../../components/SelecionarData';
import SelecionarServicos from '../../components/SelecionarServicos';
import ResumoAgendamento from '../../components/ResumoAgendamento';

function Agendamento({ navigation }) {
  const [etapaAtual, setEtapaAtual] = React.useState(0);
  const [dataSelecionada, setDataSelecionada] = React.useState(new Date());
  const [carroSelecionado, setCarroSelecionado] = React.useState({});
  const [servicosSelecionados, setServicosSelecionados] = React.useState([]);

  const selecionarData = (data) => {
    setDataSelecionada(data);
    setEtapaAtual(1);
  };

  const selecionarCarro = (carro) => {
    setCarroSelecionado(carro);
    setEtapaAtual(2);
  };

  const selecionarServicos = (servicos) => {
    setServicosSelecionados(servicos);
    setEtapaAtual(3);
  };

  return (
    <Page>
      <Surface style={styles.fundo}>
        {etapaAtual === 0 && <SelecionarData selecionarData={selecionarData} />}
        {etapaAtual === 1 && <SelecionarCarro selecionarCarro={selecionarCarro} />}
        {etapaAtual === 2
        && (
        <SelecionarServicos
          tamanho={carroSelecionado.tamanho}
          selecionarServicos={selecionarServicos}
        />
        )}
        {etapaAtual === 3 && (
        <ResumoAgendamento
          carroSelecionado={carroSelecionado}
          dataSelecionada={dataSelecionada}
          servicosSelecionados={servicosSelecionados}
          navigation={navigation}
        />
        )}
      </Surface>
    </Page>
  );
}

export default Agendamento;
