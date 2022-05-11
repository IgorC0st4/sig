import React from 'react';
import {
  Card, List, Button, DefaultTheme,
} from 'react-native-paper';
import styles from './styles';

function ItemAccordion({ item }) {
  return (
    <Card style={{ ...styles.fullWidth, ...styles.card }}>
      <Card.Title title={item.placa} />
      <Card.Content>
        <List.Item title={item.modelo} description="Modelo" />
        <List.Item title={item.cor} description="Cor" />
        <List.Item title={item.tamanho} description="Tamanho" />
      </Card.Content>
      <Card.Actions style={{ ...styles.fullWidth, ...styles.cardActions }}>
        <Button icon="pencil">Editar</Button>
        <Button icon="delete" color={DefaultTheme.colors.error}>Excluir</Button>
      </Card.Actions>
    </Card>
  );
}

export default ItemAccordion;
