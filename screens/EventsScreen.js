
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Linking, Alert, StyleSheet, View, TextInput, FlatList, ProgressViewIOS, SafeAreaView, ScrollView } from 'react-native';
import _ from 'lodash';
import Toast from 'react-native-tiny-toast';
import { Card, ListItem, Button, Icon, Text, withTheme, Image } from 'react-native-elements';
import { renderItem, createTable } from './src/RenderItem';
import { HeaderElement } from './src/Header';

export default function EventsScreen({ navigation }) {

    const link = 'http://open-api.myhelsinki.fi/v1/events';
    const [isTrue, setIsTrue] = useState(false);
    const [events, setEvents] = useState([]);
    var result = [];



    //Geting events from Helsinki API by tag
    const getEvents = (keyword) => {
        result = [];
        setEvents([]);
        setIsTrue(true);
        fetch(link + keyword)
            .then((response) => response.json())
            .then((responseData) => {
                setEvents(responseData.data);
                setIsTrue(false);
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });


    }

    //Calling useEffect to create table in database
    React.useEffect(() => {
        createTable;
    }, [])

    //Grouping events by the name 
    result = _.chain(events).groupBy("name.fi").map(function (v, i) {
        return {
            name: i,
            nameEn: _.get(_.find(v, 'name.en'), 'name.en'),
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
        return n.link == null || n.nameEn == null;
    });

    //Rendering EventScreen component
    return (
        <View style={styles.container}>
            <HeaderElement />
            <View style={styles.textContainer}>
                <Text style={{ fontSize: 20, alignSelf: "center" }}>What kind of events would you like to find? </Text>
            </View>
            <View style={styles.buttonsWrap}>
                <View style={styles.buttonsRow}>
                    <Button
                        buttonStyle={styles.button}
                        title="Music"
                        onPress={() => getEvents("/?tags_search=music")}
                    />
                    <Button
                        buttonStyle={styles.button}
                        title="Theatre"
                        onPress={() => getEvents("/?tags_search=theatre")}
                    />


                    <Button
                        buttonStyle={styles.button}
                        title="Food"
                        onPress={() => getEvents("/?tags_search=food")}
                    />
                    <Button
                        buttonStyle={styles.button}
                        title="Exhibitions"
                        onPress={() => getEvents("/?tags_search=exhibitions")}
                    />



                </View>

            </View>

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

//StylesSheet for events Screen
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
    buttonsRow: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    buttonsWrap: {
        flex: 2,
        justifyContent: "flex-start"
    },
    button: {

        backgroundColor: "#0072c6"
    },
    textContainer: {
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        alignSelf: "center",
        justifyContent: "flex-end"
    }
});
