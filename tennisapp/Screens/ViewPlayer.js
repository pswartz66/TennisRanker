import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import Spinner from 'react-native-loading-spinner-overlay';

// This page will show data from a single player. The coach can update their data from here.
export default class ViewPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            player: [],
            coachID: '',
            loading: false,
        };
    };

    componentDidMount() {
        this.setState({
            coachID: this.props.route.params.coachID,
            id: this.props.route.params.id
        });
        this.findPlayer();
        console.log('Line 24: ' + this.state.id);
    }

    // Find and load the player first:
    findPlayer() {
        this.setState({ loading: true })
        const app = this.props.route.params.app;
        const mongodb = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
        const playersCollection = mongodb.db("tennisranker").collection("playerinfo");
        const query = { 'id': this.state.id };
        playersCollection.find(query).toArray()
            .then(player => {
                console.log('Line 36: ' + player)
                this.setState({
                    player,
                    loading: false
                })
            })
            .catch(err => console.error(`Failed to find documents: ${err}`))
        }

    // Submit edits:
    editPlayer() {
        
    };


    render() {
        console.log('Line 52: ' + this.state.player);
        return (
            <View>
                <Spinner
                        visible={this.state.loading}
                        textContent={''}
                        textStyle={styles.spinnerTextStyle}
                    />
                <Text>View Player page- for viewing and editing a single player?</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    }
});