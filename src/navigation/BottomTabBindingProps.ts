import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabParamList} from './RootTabs';
import {RootParamList} from './NavigationRoot';

export interface BottomTabBindingProps<S extends keyof BottomTabParamList> {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, S>,
    StackNavigationProp<RootParamList>
  >;
  route: RouteProp<BottomTabParamList, S>;
}
