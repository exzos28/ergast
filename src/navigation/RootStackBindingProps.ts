import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootParamList} from './NavigationRoot';

export interface RootStackBindingProps<S extends keyof RootParamList> {
  navigation: StackNavigationProp<RootParamList>;
  route: RouteProp<RootParamList, S>;
}
