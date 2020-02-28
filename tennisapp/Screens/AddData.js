import React from 'react';
import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
// import { Header } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';


export default class AddData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            playerName: '',
            wins: '0',
            losses: '0',
            coachID: '',
            password: '',
        };
    };

    componentDidMount() {
        this.setState({
            coachID: this.props.route.params.coachID,
            password: this.props.route.params.password
        })
    }


    addPlayer() {
        // const app = Stitch.defaultAppClient
        const app = this.props.route.params.app;
        const mongodb = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
        const playersCollection = mongodb.db("tennisranker").collection("playerinfo");

        // insert player into database
        playersCollection
            .insertOne({
                owner_id: this.state.coachID,
                coachID: this.state.coachID,
                name: this.state.playerName,
                wins: this.state.wins,
                losses: this.state.losses
            })

            // then navigate to main screen of all players
            .then(() => this.props.navigation.navigate('ViewPlayers',
            {
                password: this.state.password,
                coachID: this.state.coachID,
                name: this.state.playerName,
                app
            }))
            .catch(console.error);

    }


    render() {
        return (

            <View>
                <View style={styles.header}>

                </View>
                <ScrollView>

                    <View style={styles.inputContainer}>

                        {/* <Text style={styles.playerName}>Player Name</Text> */}
                        <TextInput
                            autoFocus={true}
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            onChangeText={(text) => this.setState({ playerName: text })}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                            name='playersName'
                            placeholder="Player Name"
                        />

                        <Text style={styles.wins}>Wins</Text>
                        <NumericInput
                            style={styles.numberInput}
                            value={this.state.value}
                            onChange={value => this.setState({ wins: value })}
                            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                            totalWidth={220}
                            totalHeight={60}
                            iconSize={25}
                            step={1}
                            valueType='real'
                            rounded
                            textColor='#dcfd50'
                            iconStyle={{ color: 'white' }}
                            rightButtonBackgroundColor='black'
                            leftButtonBackgroundColor='black' 
                            borderColor= '#dcfd50' 
                            />
                        <Text style={styles.losses}>Losses</Text>
                        <NumericInput
                            style={styles.numberInput}
                            value={this.state.value}
                            onChange={value => this.setState({ losses: value })}
                            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                            totalWidth={220}
                            totalHeight={60}
                            iconSize={25}
                            step={1}
                            valueType='real'
                            rounded
                            textColor='#dcfd50'
                            iconStyle={{ color: 'white' }}
                            rightButtonBackgroundColor='black'
                            leftButtonBackgroundColor='black' 
                            borderColor= '#dcfd50' 
                            />

                        <TouchableOpacity
                            onPress={() => this.addPlayer()}
                            style={{ width: 220, marginTop: 30, backgroundColor: 'blue', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 5 }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Add player</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 30,
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        width: '100%',
        height: 900,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    numberInput: {
        flex: 2,
        flexDirection: 'row' 
    },
    playerName: {
        color: 'white',
        fontSize: 28
    },
    wins: {
        color: 'white',
        fontSize: 28
    },
    losses: {
        color: 'white',
        fontSize: 28
    }
});
