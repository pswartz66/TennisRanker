import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import Test from './src/components/test/Test';
import MainText from './src/components/mainText/MainText';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>Yoooo Phil and Jack are on MOBILE!!!!</Text>
        <Test />
        <MainText />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 35,
    padding: 15,
    textAlign: 'center',
  }
});
