import { StyleSheet, View, TextInput, FlatList, ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import React, { useState } from 'react';
import { Card, ListItem, Button, Icon, Text, withTheme, Header, Image } from 'react-native-elements'
import { HeaderElement } from './src/Header';


export default function HomeScreen(props) {
    const navigationOptions = { title: 'Home', };
    const { navigate } = props.navigation;


    return (
        <View style={styles.container}>

            <HeaderElement />


            <SafeAreaView style={styles.safeArea}>
                <ScrollView >
                    <View style={styles.cardwrap}>

                        <Card
                            containerStyle={styles.card}
                            image={require('../pics/p2.jpg')}
                            title='EVENTS'
                        >
                            <Text style={{ marginBottom: 10 }}>
                                Check the list of events and savethe ones you would like to visit.</Text>
                            <Button
                                buttonStyle={styles.button}
                                title='VIEW NOW'
                                onPress={() => navigate('Events')} />
                        </Card>

                        <Card
                            containerStyle={styles.card}
                            title='PLACES'
                            image={require('../pics/pic2.jpg')}

                        >
                            <Text style={{ marginBottom: 10 }}>
                                Find places that you might want to visit.
                        Save them in your fav places not to lose. </Text>
                            <Button
                                buttonStyle={styles.button}
                                title='VIEW NOW'
                                onPress={() => navigate('Places')} />
                        </Card>

                    </View>


                    <View style={styles.cardwrap}>

                        <Card
                            title='MY PLANS'
                            containerStyle={styles.card}
                            image={require('../pics/p4.jpg')}
                        >
                            <Text style={{ marginBottom: 10 }}>
                                Check the events that you saved. </Text>
                            <Button
                                buttonStyle={styles.button}
                                title='VIEW NOW'
                                onPress={() => navigate('MyPlans')} />
                        </Card>

                        <Card
                            containerStyle={styles.card}
                            title='MY FAV PLACES'
                            image={require('../pics/oodi.jpg')}
                        >
                            <Text style={{ marginBottom: 10 }}> Check the list of your favourite places.</Text>
                            <Button
                                buttonStyle={styles.button}
                                title='VIEW NOW'
                                onPress={() => navigate('FavPlaces')} />
                        </Card>

                    </View>

                </ScrollView>
            </SafeAreaView>



        </View>
    )

}

HomeScreen.navigationOptions = ({ navigate }) => ({ title: 'Home' });

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#9fc9eb",
        justifyContent: "center"
    },
    cardwrap: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    card: {
        borderRadius: 2,
        borderWidth: 0,
        width: "48%",
        justifyContent: "space-between",

    },
    header: {
        borderBottomWidth: 0,
        backgroundColor: "#0072c6",
        flex: 2
    },
    safeArea: {
        flex: 12
    },
    button: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        backgroundColor: "#0072c6"
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