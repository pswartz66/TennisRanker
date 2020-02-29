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
        // this.setState({
        //     coachID: this.props.route.params.coachID,
        //     id: this.props.route.params.id
        // });
        // console.log(id);
        // this.findPlayer();
        console.log('Line 24: ' + this.props.route.params.id);
    }
    
    // Find and load the player first:
    // I don't believe this function is necessary, app will also be faster without it
    findPlayer() {
        // this.setState({ loading: true })
        // const app = this.props.route.params.app;
        // const mongodb = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
        // const playersCollection = mongodb.db("tennisranker").collection("playerinfo");
        // const query = { 'id': this.props.route.params.id };
        // console.log(query);
        // playersCollection.find(query).toArray()
        //     .then(player => {
        //         // console.log('Line 36: ' + this.props.route.params.name)
        //         this.setState({
        //             player,
        //             loading: false
        //         })
        //         console.log(player);
        //     })
        //     .catch(err => console.error(`Failed to find documents: ${err}`))
    }
        
    // Submit edits:
    editPlayer() {
        // psuedocode
        // const app = this.props.route.params.app;
        // const mongodb = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
        // const playersCollection = mongodb.db("tennisranker").collection("playerinfo");
        // const query = { 'id': this.props.route.params.id };
        // 
    };


    render() {
        console.log('Line 52: ' + this.props.route.params.name);
        return (
            <View>
                <Spinner
                        visible={this.state.loading}
                        textContent={''}
                        textStyle={styles.spinnerTextStyle}
                    />
                <Text>View Player page- for viewing and editing a single player?</Text>
                <View style={styles.cardContainer}>
                    <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {this.props.route.params.name}
                    </Text>
                    </View>
                    
                    <View styles={styles.editPlayerForm}>
                        <Text>
                            This is just a sample so Jack can see my changes...
                        </Text>
                        <Text>
                            {this.props.route.params.name} has {this.props.route.params.wins} wins
                        </Text>
                        <Text>
                            {this.props.route.params.name} has {this.props.route.params.losses} losses
                        </Text>
                        <Text>
                            I'm thinking we add a "save" button here inside a form and when clicked just do an update query
                        </Text>
                    </View>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        backgroundColor: 'orange',
        height: 300
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: '100%',
        backgroundColor: 'gray'
    },
    headerText: {
        fontSize: 40
    },
    editPlayerForm: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
        height: 240,
        width: '100%',
    },  
    spinnerTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    }
});