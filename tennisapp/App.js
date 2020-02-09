// import React from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text, View, Image } from 'react-native';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.view}>
      
      <Image style={styles.homeImage} source={require('./img/tennisball.jpg')} />
      <Text>Home Screen</Text>
    </View>
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'HomePage'}} />

      {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Yoooo Phil and Jack are on MOBILE!!!!</Text>
      </View> */}

      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  homeImage: {
    width: '100%', 
    height: '100%', 
    zIndex: -1
  }
});


export default App;