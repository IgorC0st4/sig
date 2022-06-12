import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  centerAlign: {
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
    padding: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.grey100,
  },
});

export default styles;
