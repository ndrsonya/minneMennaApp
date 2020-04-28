import React from 'react';
import { View, Text, FlatList } from 'react-native';
import HomeScreen from './HomeScreen';


export default function PlacesScreen(props) {
    const { params } = props.navigation.state;
    return (
        <View>
            <Text> Places</Text>
        </View>
    );
};