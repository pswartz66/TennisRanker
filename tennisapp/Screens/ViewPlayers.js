import React from 'react';
import { Item, StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
import { ListItem, SearchBar } from 'react-native-elements';
import tennisBall from '../assets/tennisBall.jpeg';


// This page will show a list of all players and will allow the user to select a player to edit and will redirect to the ViewPlayer page.
// I think the user should be redirected here once they login.
export default class ViewPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coachID: '',
            password: '',
            name: '',
            players: []
        };
    };

    // When we first arrive at this screen we should load the coaches players if they have any
    // If they don't, we should render a form they can use to add players
    componentDidMount() {
        this.setState({
            coachID: this.props.route.params.coachID,
            password: this.props.route.params.password,
            name: this.props.route.params.name
        })

        this.findPlayers()
    }

    deletePlayer(pName, pWins, pLosses) {
        console.log('Player deleted. JK.');

        // this.setState({
        //     name: pName
        // })

        const app = this.props.route.params.app;
        const mongodb = app.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
        const playersCollection = mongodb.db("tennisranker").collection("playerinfo");
        // const query = ({ "coachID": this.props.route.params.coachID}, ({"name": pName });
        // console.log(query);
        console.log(pName);


        playersCollection.deleteOne(
            { "coachID": this.props.route.params.coachID },
            { "name": pName },
            { "wins": pWins },
            { "losses": pLosses }
        )
            .then(res => {
                console.log('Player: ' + pName + ' was deleted from db');
                this.findPlayers();
            })
            .catch(err => console.log(`Did not remove the player document: ${err}`))

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
        // sort by greatest number of wins to least number of wins
        const options = { "sort": { "wins": -1 }, };

        playersCollection.find(query, options).toArray()
            .then(players => {
                this.setState({ players })
            })
            .catch(err => console.error(`Failed to find documents: ${err}`))
    }

    // Search for a player:
    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
      };

    render() {
        if (this.state.players.length === 0) {
            return (
                <View style={styles.viewContainer}>
                    <Text style={styles.textStyle}>You need to add some players!</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddData',{
                            password: this.state.password,
                            coachID: this.state.coachID,
                            name: this.state.playerName
                        })}
                        style={{ width: 260, marginTop: 30, backgroundColor: 'black', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 5, borderWidth: 2, borderColor: '#0959' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Click to add players!</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    {/* We can remove this later but I needed to be able to quickly
                    naviagte back and forth between viewplayers and add player */}
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('AddData',
                        {
                            coachID: this.props.route.params.coachID
                        })}
                        style={styles.addPlayersButton}>
                        <Text style={styles.addPlayersButtonText}>Add more players</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.players}
                        renderItem={({ item }) => (
                            <>
                                <ListItem key={item.name} style={styles.listItem}
                                    leftAvatar={{ source: tennisBall }}
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
                                            <TouchableOpacity onPress={() => this.editPlayer()} style={styles.editButton}><Text style={styles.textStyle}>Edit Player</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.deletePlayer(item.name, item.wins, item.losses)} style={styles.deleteButton}><Text style={styles.textStyle}>Delete Player</Text></TouchableOpacity>
                                        </View>
                                    }
                                    key={item.name}
                                />
                            </>
                        )}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={this.renderHeader}
                    />
                </SafeAreaView>
            )
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 1
    },
    deleteButton: {
        width: 200,
        marginTop: 10,
        backgroundColor: 'red',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        borderRadius: 5,
    },
    editButton: {
        width: 200,
        marginTop: 10,
        backgroundColor: 'blue',
        paddingTop: 10,
        paddingRight: 10,
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
        marginLeft: 10,
        marginRight: 10,
    },
    losses: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
    },
    playerName: {
        fontSize: 20,
        marginTop: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginRight: '15%',
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    viewContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wins: {
        fontSize: 18,
        marginTop: 10,
    },
    addPlayersButton: {
        alignItems: 'center',
        height: 60,
        width: 'auto',
        margin: 10,
        paddingTop: 22,
        backgroundColor: 'black',
        borderRadius: 6,
    },
    addPlayersButtonText: {
        textAlign: 'center',
        color: 'white'
    }
});