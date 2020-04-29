import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import HomeScreen from './HomeScreen';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coursedb.db');


export default function MyPlansScreen(props) {
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
    const { params } = props.navigation.state;
    return (
        <View style={styles.container}>
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
});