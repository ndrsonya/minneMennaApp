
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Linking, Alert, StyleSheet, View, TextInput, FlatList, ProgressViewIOS, SafeAreaView, ScrollView } from 'react-native';
import _ from 'lodash';
import Toast from 'react-native-tiny-toast';
import { Card, ListItem, Button, Icon, Text, withTheme, Image } from 'react-native-elements';
import { renderItem, createTable } from './src/RenderItem';
import { HeaderElement } from './src/Header';


export default function EventsScreen({ navigation }) {

    const link = 'http://open-api.myhelsinki.fi/v1/events/';
    const [isTrue, setIsTrue] = useState(true);
    const [events, setEvents] = useState([]);



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

    //Deleting events without the link
    _.remove(result, function (n) {
        return n.link == null;
    });
    //Key extractor for flat list
    keyExtractor = (item, index) => index.toString()

    return (
        <View style={styles.container}>
            <HeaderElement />

            <SafeAreaView style={styles.safeArea}>
                <ActivityIndicator style={styles.activity} animating={isTrue} size="large" color="#000000 " />
                <FlatList
                    style={styles.flatlist}
                    keyExtractor={this.keyExtractor}
                    renderItem={renderItem}
                    data={result}
                />
            </SafeAreaView>

        </View >
    );
};

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
