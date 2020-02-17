import React from 'react';
import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
// import { Header } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';


export default class AddData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            playerName: '',
            wins: '',
            losses: ''
        };
    };

    // componentDidMount() {
    //     this.setState({
    //         username: this.props.route.params.username,
    //     })
    //     this.getUsername();
    // }

    // // get user:
    // getUsername() {
    //     const app = this.props.route.params.app;
    //     const mongodb = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
    //     const usersCollection = mongodb.db("tennisranker").collection("userinfo");
    //     const query = { 'username': this.props.route.params.username };
    //     // const options = { "sort": { "name": -1 }, };

    //     usersCollection.find(query).toArray()
    //         .then(userObj => {
    //             this.setState({ username: userObj.username })
    //         })
    //         .catch(err => console.error(`Failed to find documents: ${err}`))
    // }

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
                            // change this to navigate to view all players
                            // use react-native-elements card to display all players and their
                            // records.
                            // check this link:
                            // https://react-native-elements.github.io/react-native-elements/docs/0.19.1/card.html
                            onPress={() => console.log(`Player: ${this.state.playerName} \nRecord: ${this.state.wins} - ${this.state.losses}`)}
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
