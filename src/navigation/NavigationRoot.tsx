import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootTabs} from './RootTabs';

const Stack = createStackNavigator();

export const NavigationRoot = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={RootTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
