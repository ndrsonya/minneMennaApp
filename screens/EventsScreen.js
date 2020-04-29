
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Linking, Alert, StyleSheet, View, Button, TextInput, FlatList, Image, ProgressViewIOS } from 'react-native';
import _ from 'lodash';
import * as SQLite from 'expo-sqlite';
import Toast from 'react-native-tiny-toast';
import { ListItem } from 'react-native-elements';
import { Icon, Text } from 'react-native-elements'


const db = SQLite.openDatabase('coursedb.db');


export default function EventsScreen(props) {
    const { params } = props.navigation.state;
    const link = 'http://open-api.myhelsinki.fi/v1/events/';
    let data = events;
    const [isTrue, setIsTrue] = useState(true);
    const [events, setEvents] = useState([]);
    const [list, setList] = useState([]);



    //Create table in database to store user's events
    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists events (id integer primary key not null, name text, description text, location text);');
        });
        updateList();
    }
    // Save event to database
    const saveItem = (item) => {
        Toast.show('Event is saved');
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
    //Rendering events
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
            link: _.get(_.find(v, 'info_url'), 'info_url'),
            id: _.get(_.find(v, 'id'), 'id')
        }
    }).value();

    //Deleting cancelled events from the list by keywords
    _.remove(result, function (n) {
        return n.name.toLowerCase().includes("peruttu") || n.name.toLowerCase().includes("peruutettu") || n.name.toLowerCase().includes("suljettu");
    });

    //Deleting cancelled events without the link
    _.remove(result, function (n) {
        return n.link == null;
    });

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
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
    const loadInBrowser = (link) => {
        Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
    };



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

            <ActivityIndicator style={styles.activity} animating={isTrue} size="large" color="#000000 " />

            <FlatList
                style={styles.flatlist}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                data={result}
            />

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f5a3c7"
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
    subtitleView: {
        flexDirection: 'column',
        width: "100%",


    },
    ratingText: {

    },
    li: {
       
        backgroundColor: "#f5a3c7"
    }
});
