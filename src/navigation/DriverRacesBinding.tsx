import React, {useEffect} from 'react';
import {RootStackBindingProps} from './RootStackBindingProps';
import DriverRacesScreen from '../screens/DriverRacesScreen';

export const DriverRacesBinding = ({
  route,
  navigation,
}: RootStackBindingProps<'DriverRaces'>) => {
  const id = route.params.id;
  useEffect(() => {
    navigation.setOptions({headerTitle: `Races: ${id}`});
  }, [id, navigation]);
  return <DriverRacesScreen id={route.params.id} />;
};
