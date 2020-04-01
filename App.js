import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import PlacesScreen from './PlacesScreen';
import ActivitiesScreen from './ActivitiesScreen';
import EventsScreen from './EventsScreen';
import FavPlacesScreen from './FavPlacesScreen';
import MyPlansScreen from './MyPlansScreen';


const MyApp = createStackNavigator({
  Home: { screen: HomeScreen },
  Places: {screen: PlacesScreen },
  Activities: {screen: ActivitiesScreen},
  Events: {screen: EventsScreen},
  FavPlaces: {screen: FavPlacesScreen},
  MyPlans: {screen: MyPlansScreen}

})

const AppContainer = createAppContainer(MyApp);

export default function App() {
  return (<AppContainer />);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
