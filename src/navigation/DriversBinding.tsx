import React, {useCallback} from 'react';
import {BottomTabBindingProps} from './BottomTabBindingProps';
import DriversScreen from '../screens/DriversScreen';
import {DriverId} from '../store/drivers/types';

export const DriversBinding = ({
  navigation,
}: BottomTabBindingProps<'Drivers'>) => {
  const goToDriver = useCallback(
    (id: DriverId) => navigation.navigate('DriverRaces', {id}),
    [navigation],
  );
  return <DriversScreen goToDriver={goToDriver} />;
};
