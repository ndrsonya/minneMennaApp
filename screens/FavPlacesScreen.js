import React from 'react';
import { View, Text, FlatList } from 'react-native';
import HomeScreen from './HomeScreen';


export default function FavPlacesScreen(props) {
    const { params } = props.navigation.state;
    return (
        <View>
            <Text>My Favorite Places</Text>
        </View>
    );
};