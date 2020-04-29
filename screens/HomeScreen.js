import { StyleSheet, View, TextInput, FlatList, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import React, { useState } from 'react';
import { Card, ListItem, Button, Icon, Text, withTheme } from 'react-native-elements'


export default function HomeScreen(props) {
    const navigationOptions = { title: 'Home', };
    const { navigate } = props.navigation;


    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <Text h3 >Minne mennä</Text>
                <Image
                    style={styles.logo}
                    source={require('../pics/hki.png')}
                />
            </View>


            <View style={styles.cardwrap}>

                <Card
                    containerStyle={styles.card}
                    image={require('../pics/vappu.jpg')}
                    title='EVENTS'
                >
                    <Text style={{ marginBottom: 10 }}>
                       Check the list of events in Helsinki region and save the ones you would like to visit.</Text>
                    <Button

                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#0072c6" }}
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

                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#0072c6" }}
                        title='VIEW NOW'
                        onPress={() => navigate('Places')} />
                </Card>

            </View>


            <View style={styles.cardwrap}>

                <Card
                    title='MY PLANS'
                    containerStyle={styles.card}
                    image={require('../pics/plans.jpg')}
                >
                    <Text style={{ marginBottom: 10 }}>
                        Check the events that you saved. </Text>
                    <Button

                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#0072c6" }}
                        title='VIEW NOW'
                        onPress={() => navigate('MyPlans')} />
                </Card>
                <Card
                    containerStyle={styles.card}
                    title='MY FAV PLACES'
                    image={require('../pics/oodi.jpg')}
                >
                    <Text style={{ marginBottom: 10 }}>
                        Check the list of your favourite places.</Text>
                    <Button

                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#0072c6" }}
                        title='VIEW NOW'
                        onPress={() => navigate('FavPlaces')} />
                </Card>
            </View>



        </View>
    )

}

HomeScreen.navigationOptions = ({ navigate }) => ({ title: 'Home' });

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#f5a3c7",

    },
    logo: {

        width: 110,
        height: 50,
        zIndex: 0
    },
    wrap: {
        marginTop: 1,
        marginLeft: "10%",
        width: "80%",
        flexDirection: "row",
        fontFamily: "sans-serif",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cardwrap: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        
    },
    card: {
        borderRadius: 5,
        borderWidth: 0,
        width: "45%",
        justifyContent: "space-between",
        
    }


});