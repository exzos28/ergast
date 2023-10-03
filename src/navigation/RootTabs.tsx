import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';
import {HomeScreen2} from '../screens/HomeScreen2';

const Tab = createBottomTabNavigator();

export const RootTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={HomeScreen2} />
    </Tab.Navigator>
  );
};
