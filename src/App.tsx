import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationRoot} from './navigation/NavigationRoot';

export default function App() {
  return (
    <NavigationContainer>
      <NavigationRoot />
    </NavigationContainer>
  );
}
