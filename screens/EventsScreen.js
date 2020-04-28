
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image, ProgressViewIOS } from 'react-native';
import _ from 'lodash';
import * as SQLite from 'expo-sqlite';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

const db = SQLite.openDatabase('coursedb.db');


export default function EventsScreen(props) {
    const { params } = props.navigation.state;
    const link = 'http://open-api.myhelsinki.fi/v1/events/';
    let data = events;
    const [isTrue, setIsTrue] = useState(true);
    const [events, setEvents] = useState([]);
    const [list, setList] = useState([]);
    const colorScheme = useColorScheme();

    const themeStatusBarStyle =
        colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle =
        colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle =
        colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    //Create table in database to store user's events
    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists events (id integer primary key not null, name text, description text, location text);');
        });
        updateList();
    }
    // Save event to database
    const saveItem = (item) => {
        db.transaction(tx => {
            tx.executeSql('insert into events (name, description, location) values (?, ?, ?);', [item.name, item.description, item.location]);
        }, null, updateList
        )
    }
    // Update 
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from events;', [], (_, { rows }) =>
                setList(rows._array)
            );
        });
    }

    //Geting events from Helsinki API
    const getEvents = () => {
        const self = this;
        fetch(link)
            .then((response) => response.json())
            .then((responseData) => {
                setEvents(responseData.data);
                setIsTrue(false);
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });

    }

    React.useEffect(() => {
        getEvents();
        createTable();
    }, [])



    //Grouping events by the name 
    var result = _.chain(events).groupBy("name.fi").map(function (v, i) {
        return {
            name: i,
            description: _.get(_.find(v, 'description.intro'), 'description.intro'),
            location: _.get(_.find(v, 'location.address.locality'), 'location.address.locality'),
            id: _.get(_.find(v, 'id'), 'id')
        }
    }).value();

    //Deleting cancelled events from the list by keywords
    _.remove(result, function (n) {
        return n.name.toLowerCase().includes("peruttu") || n.name.toLowerCase().includes("peruutettu") || n.name.toLowerCase().includes("suljettu");
    });

    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "80%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "10%"
                }}
            />
        );
    };




    return (
        <View style={styles.container}>
            <AppearanceProvider style={[styles.container, themeContainerStyle]}>
                <ActivityIndicator style={styles.activity} animating={isTrue} size="large" color="#000000 " />
                <FlatList
                    style={{ marginTop: "10%" }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <View>
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.location}</Text>
                            <Button onPress={() => saveItem(item)} title="Save event" />
                        </View>
                    }
                    ItemSeparatorComponent={listSeparator}
                    data={result}
                />
            </AppearanceProvider>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activity: {
        marginTop: 50
    },

    lightContainer: {
        backgroundColor: '#D0D0C0',
    },
    darkContainer: {
        backgroundColor: '#242C40',
    },
    lightThemeText: {
        color: '#242C40',
    },
    darkThemeText: {
        color: '#D0D0C0',
    },
});
