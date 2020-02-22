import React from 'react';
import { Item, StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import { ListItem } from 'react-native-elements'

// This page will show a list of all players and will allow the user to select a player to edit and will redirect to the ViewPlayer page.
// I think the user should be redirected here once they login.
export default class ViewPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coachID: '',
            password: '',
            players: []
        };
    };

    // When we first arrive at this screen we should load the coaches players if they have any
    // If they don't, we should render a form they can use to add players
    componentDidMount() {
        this.setState({
            coachID: this.props.route.params.coachID,
            password: this.props.route.params.password
        })

        this.findPlayers()
    }

    deletePlayer() {
        console.log('Player deleted. JK.');
    }

    editPlayer() {
        console.log('Player edited. JK.');
    }

    // Cute lil seperator for the list of wins and losses:
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                    marginLeft: "15%",
                    marginRight: '15%'
                }}
            />
        );
    };

    // Find players:
    findPlayers() {
        const app = this.props.route.params.app;
        const mongodb = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
        const playersCollection = mongodb.db("tennisranker").collection("playerinfo");
        const query = { 'coachID': this.props.route.params.coachID };
        const options = { "sort": { "name": 1 }, };

        playersCollection.find(query, options).toArray()
            .then(players => {
                this.setState({ players })
            })
            .catch(err => console.error(`Failed to find documents: ${err}`))
    }

    render() {
        if (this.state.players.length === 0) {
            return (
                <View style={styles.viewContainer}>
                    <Text style={styles.textStyle}>You need to add some players!</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddData')}
                        style={{ width: 260, marginTop: 30, backgroundColor: 'black', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 5, borderWidth: 2, borderColor: '#0959' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Click to add players!</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.players}
                        renderItem={({ item }) => (
                            <>
                                <ListItem style={styles.listItem}
                                    title={
                                        <View>
                                            <Text style={styles.playerName}>
                                                Player: {`${item.name}`}
                                            </Text>
                                        </View>
                                    }
                                    subtitle={
                                        <View>
                                            <Text style={styles.wins}>Wins: {`${item.wins}`}</Text>
                                            <Text style={styles.losses}>Losses: {`${item.losses}`}</Text>
                                            <TouchableOpacity onPress={() => this.editPlayer()} style={styles.editButton}><Text>Edit Player</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.deletePlayer()} style={styles.deleteButton}><Text>Delete Player</Text></TouchableOpacity>
                                        </View>
                                    }
                                    key={item.name}
                                />
                            </>
                        )}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            )
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 1,
    },
    deleteButton: {
        width: 220, 
        marginTop: 10, 
        backgroundColor: 'red', 
        paddingTop: 10, 
        paddingRight: 20, 
        paddingBottom: 10, 
        paddingLeft: 20, 
        borderRadius: 5
    },
    editButton: {
        width: 220, 
        marginTop: 10, 
        backgroundColor: 'blue', 
        paddingTop: 10, 
        paddingRight: 20, 
        paddingBottom: 10, 
        paddingLeft: 20, 
        borderRadius: 5,
    },
    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
    },
    losses: {
        fontSize: 20,
        marginTop: 10,
    },
    playerName: {
        fontSize: 20,
        marginTop: 10,
    },
    textStyle: {
        color: 'grey',
    },
    viewContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wins: {
        fontSize: 20,
        marginTop: 10,
    }
});