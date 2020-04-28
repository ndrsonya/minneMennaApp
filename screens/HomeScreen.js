import { StyleSheet,Text, View, Button, TextInput, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import React, { useState } from 'react';

export default function HomeScreen(props) {
    const navigationOptions = { title: 'Home', };
    const { navigate } = props.navigation;

    return(
        <View>
            <Text>Home Screen</Text>
            <Button onPress={() => navigate('Events')} title="Events" />
            <Button onPress={() => navigate('Places')} title="Places" />
            <Button onPress={() => navigate('FavPlaces')} title="My favorite places" />
            <Button onPress={() => navigate('MyPlans')} title="My Plans" />
        </View>
    )

}

HomeScreen.navigationOptions = ({ navigate }) => ({ title: 'Home' });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    
});