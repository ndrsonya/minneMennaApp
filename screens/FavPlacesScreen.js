import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import HomeScreen from './HomeScreen';
import { Card, ListItem, Button, Icon, Text, withTheme, Header, Image } from 'react-native-elements';
import { HeaderElement } from './src/Header';



export default function FavPlacesScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <HeaderElement />
            <SafeAreaView style={styles.safeArea}>
                <Text>My Favorite Places</Text>
            </SafeAreaView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listcontainer: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    header: {
        borderBottomWidth: 0,
        backgroundColor: "#0072c6",
        flex: 2
    },
    safeArea: {
        flex: 12
    },
    headerCenterComponent: {
        justifyContent: "center",
    },
    logo: {
        tintColor: "white",
        width: 110,
        height: 50,
        zIndex: 0


    }
});