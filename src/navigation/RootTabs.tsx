import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DriversBinding} from './DriversBinding';
import {HomeScreen2} from '../screens/HomeScreen2';

export type BottomTabParamList = {
  Drivers: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const RootTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Drivers" component={DriversBinding} />
      <Tab.Screen name="Settings" component={HomeScreen2} />
    </Tab.Navigator>
  );
};
