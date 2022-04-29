import React from 'react';
import { List } from 'react-native-paper';

function CardServico() {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>

      <List.Accordion
        title={`Serviços ${new Date().toLocaleDateString()}`}
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
}

export default CardServico;
