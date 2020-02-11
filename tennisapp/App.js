import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen.js';
import LoginScreen from './Screens/LoginScreen.js';
import SignupScreen from './Screens/SignupScreen.js';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'HomeScreen' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'LoginScreen' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'SignupScreen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
