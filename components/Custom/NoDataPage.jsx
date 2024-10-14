import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Empty from '../../icons/Empty';

const NoDataPage = ({ children, text }) => {
  return (
    <View style={styles.container}>
      <Empty />
      {text && <Text style={styles.title}>{text}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    height: "100%"
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default NoDataPage;
