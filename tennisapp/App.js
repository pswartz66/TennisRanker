import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen.js';
import LoginScreen from './Screens/LoginScreen.js';
import SignupScreen from './Screens/SignupScreen.js';
import ViewPlayers from './Screens/ViewPlayers';
import ViewPlayer from './Screens/ViewPlayer';
import AddData from './Screens/AddData';

import 'react-native-gesture-handler';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'HomeScreen' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'LoginScreen' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'SignupScreen' }} />
        <Stack.Screen name="ViewPlayer" component={ViewPlayer} options={{ title: 'ViewPlayerScreen' }} />
        <Stack.Screen name="ViewPlayers" component={ViewPlayers} options={{ title: 'ViewPlayersScreen' }} />
        <Stack.Screen name="AddData" component={AddData} options={{ title: 'AddDataScreen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
