
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Linking, Alert, StyleSheet, View, TextInput, FlatList, ProgressViewIOS, SafeAreaView, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon, Text, withTheme, Header, Image } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import Toast from 'react-native-tiny-toast';

const db = SQLite.openDatabase('coursedb.db');

const loadInBrowser = (link) => {
    Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
};


//Create table in database to store user's events
export const createTable = () => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists events (id integer primary key not null, name text, description text, location text);');
    });

}
// Save event to database
export const saveItem = (item) => {
    Toast.show('Event is saved');
    db.transaction(tx => {
        tx.executeSql('insert into events (name, description, location) values (?, ?, ?);', [item.name, item.description, item.location]);
    }, null,

    )
}


export const renderItem = ({ item }) => (
    <ListItem
        containerStyle={styles.li}
        onPress={() => loadInBrowser(item.link)}
        title={item.name}
        subtitle={
            <View style={styles.subtitleView}>
                <Text style={styles.ratingText}>{item.description}</Text>

            </View>}
        titleStyle={{ fontWeight: 'bold' }}
        rightIcon={<Icon
            name='bookmark'
            color="#0072c6"
            onPress={() => saveItem(item)}
            size="30"
        />}
        chervon
        bottomDivider

    />
)

const styles = StyleSheet.create({
    
    subtitleView: {
        flexDirection: 'column',
        width: "100%",
    },
    ratingText: {

    },
    li: {
        backgroundColor: "#9fc9eb",
    },

});