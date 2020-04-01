import React from 'react';
import { View, Text, FlatList } from 'react-native';
import HomeScreen from './HomeScreen';


export default function EventsScreen(props) {
    const { params } = props.navigation.state;
    return (
        <View>
            <Text>Events</Text>
        </View>
    );
};