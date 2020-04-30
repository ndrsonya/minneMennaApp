import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, FlatList, SafeAreaView, ScrollView } from 'react-native';
import HomeScreen from './HomeScreen';
import * as SQLite from 'expo-sqlite';
import { Card, ListItem, Button, Icon, Text, withTheme, Header, Image } from 'react-native-elements';
import { HeaderElement } from './src/Header';


const db = SQLite.openDatabase('coursedb.db');


export default function MyPlansScreen({ navigation }) {
    const [list, setList] = useState([]);
    //Create table in database to store user's events
    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists events (id integer primary key not null, name text, description text, location text);');
        });
        updateList();
    }
    // Update 
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from events;', [], (_, { rows }) =>
                setList(rows._array)
            );
        });
    }
    // Delete
    const deleteItem = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from events where id = ?;`, [id]);
            }, null, updateList
        )
    }
    React.useEffect(() => {
        createTable();
    }, [])
    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 5,
                    width: "80%",
                    backgroundColor: "#fff",
                    marginLeft: "10%"
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <HeaderElement />
            <SafeAreaView style={styles.safeArea}>
                <Text>My Plans</Text>
                <FlatList

                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.listcontainer}>
                            <Text style={{ fontSize: 18 }}>{item.name}, {item.description}, {item.location}</Text>
                            <Button
                                onPress={() => deleteItem(item.id)}
                                title="Delete"
                                color="#841584"
                                accessibilityLabel="Delete"
                            />

                        </View>}
                    data={list}
                    ItemSeparatorComponent={listSeparator}
                />
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