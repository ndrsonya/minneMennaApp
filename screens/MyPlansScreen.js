import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ListItem,  Icon, Text} from 'react-native-elements';
import { HeaderElement } from './src/Header';

const db = SQLite.openDatabase('coursedb.db');


export default function MyPlansScreen({ navigation }) {

    const [list, setList] = useState([]);

    // Update table
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from events;', [], (_, { rows }) =>
                setList(rows._array)
            );
        });
    }

    // Delete event to database
    const deleteItem = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from events where id = ?;`, [id]);
            }, null, updateList
        )
    }

    // Component that is used in FlatList
    const renderItem = ({ item }) => (
        <ListItem
            containerStyle={styles.li}
            title={item.name}
            subtitle={
                <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>{item.description}</Text>
    
                </View>}
            titleStyle={{ fontWeight: 'bold' }}
            rightIcon={<Icon
                name='delete'
                color="#0072c6"
                onPress={() => deleteItem(item.id)}
                size="30"
            />}
            chervon
            bottomDivider
    
        />
    )

    // Calling UseEffect to download data from database
    React.useEffect(() => {
        updateList();
    }, [])


    return (
        <View style={styles.container}>
            <HeaderElement />
            <SafeAreaView style={styles.safeArea}>
            <Text style={{ fontSize: 30, alignSelf: "center" }}>My saved events: </Text>
                <FlatList
                    style={styles.flatlist}
                    keyExtractor={this.keyExtractor}
                    renderItem={renderItem}
                    data={list}
                />

            </SafeAreaView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9fc9eb",
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
        width: "100%",
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


    },
     
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