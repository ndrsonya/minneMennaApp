import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import PlacesScreen from './screens/PlacesScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import EventsScreen from './screens/EventsScreen';
import FavPlacesScreen from './screens/FavPlacesScreen';
import MyPlansScreen from './screens/MyPlansScreen';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';




const MyApp = createStackNavigator({
  Home: { screen: HomeScreen },
  Places: { screen: PlacesScreen },
  Activities: { screen: ActivitiesScreen },
  Events: { screen: EventsScreen },
  FavPlaces: { screen: FavPlacesScreen },
  MyPlans: { screen: MyPlansScreen }

})

const AppContainer = createAppContainer(MyApp);

export default function App() {
  return (
   
      <AppContainer />
     
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
