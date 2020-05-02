import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Linking, Alert, StyleSheet, View,Image,  TextInput, FlatList, ProgressViewIOS, SafeAreaView, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon, Text, withTheme, Header, } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import Toast from 'react-native-tiny-toast';

export const HeaderElement = () => ( 
    <Header
    style={styles.headerWrap}
    containerStyle={styles.header}
    centerComponent={
        <View>
            <Text h4 style={{ color: "white" }}>Where to go </Text>
            <Image
                containerStyle={{ justifyContent: "center" }, { alignContent: "center" }}
                style={styles.logo}
                source={require('../../pics/hki.png')}
            />
        </View>
    }
    centerContainerStyle={styles.headerCenterComponent}

/>)

const styles = StyleSheet.create({
 
    header: {
       
        borderBottomWidth: 0,
        backgroundColor: "#0072c6",
        flex: 2,
    },
    headerCenterComponent: {
    },
    logo: {
    
        justifyContent: "center",
        alignSelf: "center",
        tintColor: "white",
        width: 110,
        height: 50,
        zIndex: 0

    },
    headerWrap: {
        justifyContent: "center",
        alignContent: "center"
    }
});
