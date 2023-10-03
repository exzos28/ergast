import React, {useCallback} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {AxiosError} from 'axios';

export type ErrorProps = {
  error: unknown;
  style?: StyleProp<ViewStyle>;
};

export const Error = ({error, ...rest}: ErrorProps) => {
  const getMessage = useCallback(() => {
    if (error instanceof AxiosError) {
      return error.message;
    }
    return 'Unknown error';
  }, [error]);
  return (
    <View style={[styles.root, rest.style]} {...rest}>
      <Text style={styles.icon}>⚠️</Text>
      <Text>{getMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  icon: {
    marginBottom: 10,
  },
});
