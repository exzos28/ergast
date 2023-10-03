import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationRoot} from './navigation/NavigationRoot';
import {Provider} from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavigationRoot />
      </NavigationContainer>
    </Provider>
  );
}
