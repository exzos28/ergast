import React from 'react';
import {ActivityIndicator, View, ViewProps} from 'react-native';

export const Loader = (props: ViewProps) => {
  return (
    <View {...props}>
      <ActivityIndicator />
    </View>
  );
};
