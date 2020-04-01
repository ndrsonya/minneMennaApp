import React from 'react';
import { View, Text, FlatList } from 'react-native';
import HomeScreen from './HomeScreen';


export default function ActivitiesScreen(props) {
    const { params } = props.navigation.state;
    return (
        <View>
            <Text>Activities</Text>
        </View>
    );
};