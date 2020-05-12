import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import _ from 'lodash';
import { Card, ListItem, Button, Icon, Text, withTheme, Header, Image } from 'react-native-elements';
import { HeaderElement } from './src/Header';
import { renderPlaceItem, createTablePlaces } from './src/RenderItem';


export default function PlacesScreen({ navigation }) {
    const link = 'http://open-api.myhelsinki.fi/v1/places';
    const [isTrue, setIsTrue] = useState(false);
    const [places, setPlaces] = useState([]);
    var result = [];

    //Calling useEffect to create table in database
    React.useEffect(() => {
        createTablePlaces();
    }, [])

    //Geting places from Helsinki API by tag
    const getPlaces = (keyword) => {
        result = [];
        setPlaces([]);
        setIsTrue(true);
        fetch(link + keyword)
            .then((response) => response.json())
            .then((responseData) => {
                setPlaces(responseData.data);
                setIsTrue(false);
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });


    }

    //Grouping places by the name 
    result = _.chain(places).groupBy("name.fi").map(function (v, i) {
        return {
            name: i,
            nameEn: _.get(_.find(v, 'name.en'), 'name.en'),
            description: _.get(_.find(v, 'description.body'), 'description.body'),
            location: _.get(_.find(v, 'location.address.locality'), 'location.address.locality'),
            link: _.get(_.find(v, 'info_url'), 'info_url'),
            id: _.get(_.find(v, 'id'), 'id')
        }
    }).value();

    //Deleting events without the link
    _.remove(result, function (n) {
        return n.link == null || n.nameEn == null;
    });


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
                        title="Entertainment"
                        onPress={() => getPlaces("/?tags_search=Museum")}
                    />
                    <Button
                        buttonStyle={styles.button}
                        title="Shopping"
                        onPress={() => getPlaces("/?tags_search=SHOPPING")}
                    />
                    <Button
                        buttonStyle={styles.button}
                        title="Restaurants"
                        onPress={() => getPlaces("/?tags_search=Restaurant&Cafe")}
                    />


                </View>
                <View style={styles.buttonsRow}>
                    <Button
                        buttonStyle={styles.button}
                        title="Grocery"
                        onPress={() => getPlaces("/?tags_search=Grocery")}
                    />
                    <Button
                        buttonStyle={styles.button}
                        title="Accomodation"
                        onPress={() => getPlaces("/?tags_search=ACCOMMODATION")}
                    />
                </View>

            </View>

            <SafeAreaView style={styles.safeArea}>
                <ActivityIndicator style={styles.activity} animating={isTrue} size="large" color="#000000 " />
                <FlatList
                    style={styles.flatlist}
                    keyExtractor={this.keyExtractor}
                    renderItem={renderPlaceItem}
                    data={result}
                />

            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9fc9eb',
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
    headerCenterComponent: {
        justifyContent: "center",
    },
    logo: {
        tintColor: "white",
        width: 110,
        height: 50,
        zIndex: 0
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
        justifyContent: "center"
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
    },
    activity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});