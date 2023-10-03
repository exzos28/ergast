import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabParamList, RootTabs} from './RootTabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {DriverRacesBinding} from './DriverRacesBinding';
import {DriverId} from '../store/drivers/types';

export type RootParamList = {
  Root: NavigatorScreenParams<BottomTabParamList>;
  DriverRaces: {id: DriverId};
};

const Stack = createStackNavigator<RootParamList>();

export const NavigationRoot = () => {
  return (
    <Stack.Navigator screenOptions={{headerBackTitle: 'Back'}}>
      <Stack.Screen
        name="Root"
        component={RootTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen name="DriverRaces" component={DriverRacesBinding} />
    </Stack.Navigator>
  );
};
