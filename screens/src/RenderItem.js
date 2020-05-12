
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Linking, Alert, StyleSheet, View, TextInput, FlatList, ProgressViewIOS, SafeAreaView, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon, Text, withTheme, Header, Image } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import Toast from 'react-native-tiny-toast';

const db = SQLite.openDatabase('coursedb.db');

//Function allow to open the event by link in browser
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
        tx.executeSql('insert into events (name, description, location) values (?, ?, ?);', [item.nameEn, item.description, item.location]);
    }, null,

    )
}

//Create table Places
export const createTablePlaces = () => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists places (id integer primary key not null, name text, description text, location text);');
    });

}
// Save place
export const savePlace = (item) => {
    Toast.show('Event is saved');
    db.transaction(tx => {
        tx.executeSql('insert into places (name, description, location) values (?, ?, ?);', [item.name, item.description, item.location]);
    }, null,

    )
}

//Render event item

export const renderItem = ({ item }) => (
    <ListItem
        containerStyle={styles.li}
        onPress={() => loadInBrowser(item.link)}
        title={item.nameEn}
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
//render place item
export const renderPlaceItem = ({ item }) => (
    <ListItem
        containerStyle={styles.li}
        onPress={() => loadInBrowser(item.link)}
        title={item.nameEn}
        subtitle={
            <View style={styles.subtitleView}>
                <Text style={styles.ratingText}>{item.description}</Text>
                <Button
                icon={
                    <Icon
                      name="explore"
                      size={30}
                      color="#9fc9eb"

                    />}
                        buttonStyle={styles.button}
                        title="Show in google maps"
                        
                    />
            </View>}
        titleStyle={{ fontWeight: 'bold' }}

        rightIcon={
            <Icon
                name='bookmark'
                color="#0072c6"
                onPress={() => savePlace(item)}
                size={50}
            />
        }
        chervon
        bottomDivider

    />
)


//StylesSheet for RenderItem component
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
    button: {
        backgroundColor: "#0072c6"
    }

});