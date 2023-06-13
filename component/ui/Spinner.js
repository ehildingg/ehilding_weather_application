import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Spinner = ({ text }) => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#201c4b',
  },
  loadingText: {
    fontSize: 18,
    color: '#f4f4f4',
    marginVertical: 12,
  },
});
