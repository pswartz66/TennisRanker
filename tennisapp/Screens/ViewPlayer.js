import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import Spinner from 'react-native-loading-spinner-overlay';
import NumericInput from 'react-native-numeric-input';

// This page will show data from a single player. The coach can update their data from here.
export default class ViewPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            wins: '',
            losses: '',
            loading: false,
            value: '',
        };
    };

    componentDidMount() {
        this.setState({
            wins: this.props.route.params.wins,
            losses: this.props.route.params.losses,
            name: this.props.route.params.name
        })
    }

    // Submit edits:
    editPlayer() {
        this.setState({
            loading: true
        })
        const app = this.props.route.params.app;
        const mongodb = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
        const playersCollection = mongodb.db("tennisranker").collection("playerinfo");
        const query = { '_id': this.props.route.params.id }
        const update = {
            "$set": {
                "wins": this.state.wins,
                "losses": this.state.losses
            }
        };
        const options = { "upsert": false };

        playersCollection.updateOne(query, update, options)
            .then(result => {
                const { matchedCount, modifiedCount } = result;
                if (matchedCount && modifiedCount) {
                    this.setState({
                        loading: false
                    })
                    this.props.navigation.navigate('ViewPlayers',
                    {
                        app,
                        name: this.state.name
                    })
                }
            })
            .catch(err => console.error(`Failed to add review: ${err}`))
    };


    render() {
        return (
            <View>
                <Spinner
                    visible={this.state.loading}
                />
                <View style={styles.cardContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            {this.props.route.params.name}
                        </Text>
                    </View>

                    <View styles={styles.editPlayerForm}>
                        <Text style={styles.wins}>Wins</Text>
                        <NumericInput
                            style={styles.numberInput}
                            initValue={parseInt(this.state.wins)}
                            value={this.state.value}
                            onChange={value => this.setState({ wins: parseInt(value) })}
                            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                            totalWidth={220}
                            totalHeight={60}
                            iconSize={25}
                            step={1}
                            valueType='real'
                            rounded
                            textColor='black'
                            iconStyle={{ color: 'white' }}
                            rightButtonBackgroundColor='black'
                            leftButtonBackgroundColor='black'
                            borderColor='black'
                        />
                        <Text style={styles.losses}>Losses</Text>
                        <NumericInput
                            style={styles.numberInput}
                            initValue={parseInt(this.state.losses)}
                            value={this.state.value}
                            onChange={value => this.setState({ losses: parseInt(value) })}
                            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                            totalWidth={220}
                            totalHeight={60}
                            iconSize={25}
                            step={1}
                            valueType='real'
                            rounded
                            textColor='black'
                            iconStyle={{ color: 'white' }}
                            rightButtonBackgroundColor='black'
                            leftButtonBackgroundColor='black'
                            borderColor='black'
                        />

                        <TouchableOpacity
                            onPress={() => this.editPlayer()}
                            style={{ width: 220, marginTop: 30, backgroundColor: 'blue', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 5 }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: '100%',
        color: 'grey',
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
    },
    numberInput: {
        flex: 2,
        flexDirection: 'row'
    },
    inputContainer: {
        width: '100%',
        height: 900,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});