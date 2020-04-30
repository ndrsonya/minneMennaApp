import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Linking, Alert, StyleSheet, View, TextInput, FlatList, ProgressViewIOS, SafeAreaView, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon, Text, withTheme, Header, Image } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import Toast from 'react-native-tiny-toast';

export const HeaderElement = () => ( <Header
    containerStyle={styles.header}
    centerComponent={
        <View style={styles.headerCenterComponent} >
            <Text h4 style={{ color: "white" }}>Where to go </Text>
            <Image
                containerStyle={{ justifyContent: "center" }, { alignContent: "center" }, { marginLeft: 15 }}
                style={styles.logo}
                source={require('../../pics/hki.png')}
            />
        </View>
    }
    centerContainerStyle={styles.headerCenterComponent}

/>)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9fc9eb",
        alignItems: 'center',
        justifyContent: 'center',

    },
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    flatlist: {
        width: "100%",
    },
    header: {
        borderBottomWidth: 0,
        backgroundColor: "#0072c6",
        flex: 2
    },
    safeArea: {
        flex: 12,
        width: "100%"
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
