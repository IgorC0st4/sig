import React from 'react';
import { Button, Dialog, Paragraph } from 'react-native-paper';

function RegistrarCarroDialog({ visible, hideDialog, atualizarLista }) {
  return (
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title>Novo Carro</Dialog.Title>
      <Dialog.Content>
        <Paragraph>Formulário</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => hideDialog()}>Cancelar</Button>
        <Button onPress={() => { atualizarLista(); hideDialog(); }}>Salvar</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default RegistrarCarroDialog;
