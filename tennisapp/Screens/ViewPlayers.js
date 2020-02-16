import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-browser-sdk";

// This page will show a list of all players and will allow the user to select a player to edit and will redirect to the ViewPlayer page.
// I think the user should be redirected here once they login.
export default class ViewPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coachID: '',
            password: '',
        };
    };

    // When we first arrive at this screen we should load the coaches players if they have any
    // If they don't, we should render a form they can use to add players
    componentDidMount() {
        this.setState({
            coachID: this.props.route.params.coachID,
            password: this.props.route.params.password,
            players: undefined
        })

        this.findPlayers()
    }

    // Find players:
    findPlayers() {
        const app = this.props.route.params.app;
        const mongodb = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
        const playersCollection = mongodb.db("tennisranker").collection("playerinfo");
        const query = { 'coachID': this.props.route.params.coachID };
        const options = { "sort": { "name": -1 }, };

        playersCollection.find(query, options).toArray()
            .then(players => {
                this.setState({ players })
            })
            .catch(err => console.error(`Failed to find documents: ${err}`))
    }

    render() {
        console.log(this.state.players)
        // Add map function to display all players:
        if (this.state.players) {
            return (
                <View style={styles.viewContainer}>
                    <Text style={styles.textStyle}>Players found!</Text>
                    <Text style={styles.textStyle}>{this.state.players[0].name} </Text>
                    <Text style={styles.textStyle}> Wins: {this.state.players[0].wins} </Text>
                    <Text style={styles.textStyle}> Losses: {this.state.players[0].losses} </Text>
                    <Text style={styles.textStyle}> School: {this.state.players[0].school} </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.viewContainer}>
                    <Text style={styles.textStyle}>You need to add some players!</Text>
                </View>
            )
        }
    }
};

    const styles = StyleSheet.create({
        viewContainer: {
            flex: 1,
            width: '100%',
            backgroundColor: 'grey',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textStyle: {
            color: 'white',
        } 
    });