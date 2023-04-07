import {StatusBar, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProvider} from './AppContext';

import Home from './src/screen/Home';
import Difficulty from './src/screen/Difficulty';
import Quiz from './src/screen/Quiz';
import Results from './src/screen/Result';
import Categories from './src/screen/Categorie';

// https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple&encode=url3986

const App = () => {
  useLayoutEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <AppProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Difficulty" component={Difficulty} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="Results" component={Results} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
