// import React from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.view}>
      <ImageBackground style={styles.homeBackgroundImage} source={require('./img/tennisball.jpg')}>
        <Text style={styles.text}>Tennis Rank</Text>

        <TouchableOpacity
          onPress={() => alert('Successfully Logged In')}
          style={{ marginTop: 10, backgroundColor: 'gray', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: '6px' }}>
          <Text style={{ fontSize: 22, color: '#fff' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert('Successfully Logged In')}
          style={{ marginTop: 18, backgroundColor: 'gray', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: '6px' }}>
          <Text style={{ fontSize: 22, color: '#fff' }}>SignUp</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'HomePage' }} />

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
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeBackgroundImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    shadowColor: 'black',
    fontSize: 50,
    color: '#dcfd50',
    marginBottom: 10,
  }

});

export default App;