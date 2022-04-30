import React from 'react';
import { List } from 'react-native-paper';

function ItemAccordion({ item }) {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>

      <List.Accordion
        title={item.placa}
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item title={`Modelo: ${item.modelo}`} />
        <List.Item title={`Tamanho: ${item.tamanho}`} />
        <List.Item title={`Cor: ${item.cor}`} />
      </List.Accordion>
    </List.Section>
  );
}

export default ItemAccordion;
