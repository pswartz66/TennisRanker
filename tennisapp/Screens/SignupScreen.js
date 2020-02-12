import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { unstable_renderSubtreeIntoContainer } from 'react-dom';


export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CoachesDB: [],
            userId: undefined,
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            school: '',
            keyboardVisible: 'false'
        };

        this.createUser = this.createUser.bind(this);
    };

    componentDidMount() {
        // Initialize Stitch App Client
        this.client = Stitch.initializeDefaultAppClient("tennisrank-bwnbe");

        // Define MongoDB Service Client
        // Used to log in and communicate with Stitch
        const mongodb = this.client.getServiceClient(
            RemoteMongoClient.factory,
            "mongod-atlas"
        );

        // Reference CoachesDB
        this.db = mongodb.db("CoachesDB");

    }

    componentWillUnmount() {
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        console.log('Keyboard Shown');
    }

    _keyboardDidHide() {
        alert('Keyboard Hidden');
    }


    onFnameFocus() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
    }

    // sign up a user with credentials
    createUser() {
        // event.preventDefault();
        // let coaches = {
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     username: this.state.username,
        //     password: this.state.password,
        //     school: this.state.school
        // }

        this.db
            .collection("CoachInfo")
            .insertMany({

                // breaking because id is undefined see error in console
                owner_id: this.client.auth.user.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                password: this.state.password,
                school: this.state.school
            })
            .then(this.displayUsers)
            .catch(console.error);
    };
    displayUsers() {
        // query the CoachesDB
        this.db
            .collection("CoachInfo")
            .find({})
            .asArray()
            .then(CoachesDB => {
                this.setState({CoachesDB});
            });
    }
    displayCoachesOnLoad() {
        // Anonymously log in and display comments on load
        this.client.auth
          .loginWithCredential(new AnonymousCredential())
          .then(this.displayUsers)
          .catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
          this.setState({ currentUserId: undefined });
        });
      }

    render() {
        return (
            <View style={styles.signupView}>
                <View style={styles.signupTopContainer}>
                    <Text style={styles.signupTopContainerText}>
                        Sign up for Rank it
                    </Text>
                </View>

                <View style={styles.signupView}>
                    <KeyboardAwareScrollView>
                        <TextInput
                            autoFocus={true}
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                            onChangeText={(text) => this.setState({firstName: text})}
                            value={this.state.text}
                            name='firstName'
                            placeholder="First name"
                        />
                        <TextInput
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            ref={(input) => { this.secondTextInput = input; }}
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                            onChangeText={(text) => this.setState({lastName: text})}
                            value={this.state.text}
                            name='lastName'
                            placeholder="Last name"
                        />
                        <TextInput
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            ref={(input) => { this.thirdTextInput = input; }}
                            onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                            onChangeText={(text) => this.setState({username: text})}
                            value={this.state.text}
                            name='username'
                            placeholder="Username"
                        />
                        <TextInput
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            ref={(input) => { this.fourthTextInput = input; }}
                            onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.text}
                            name='password'
                            placeholder="Password"
                        />
                        <TextInput
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            ref={(input) => { this.fifthTextInput = input; }}
                            onSubmitEditing={() => { console.log('successfully signed up!') }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                            onChangeText={(text) => this.setState({school: text})}
                            value={this.state.text}
                            name='school'
                            placeholder="School"
                        />
                        <TouchableOpacity
                            onPress={() => this.createUser()}
                            style={{ width: '100%', marginTop: 30, backgroundColor: 'black', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 5, borderWidth: 2, borderColor: '#059' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Sign up</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>

                </View>

            </View>

        )
    }
}
const styles = StyleSheet.create({
    signupTopContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupTopContainerText: {
        fontWeight: 'normal',
        shadowColor: 'white',
        fontSize: 30,
        color: '#059',
    },
    signupView: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'black'
    },
    signupText: {
        fontWeight: 'bold',
        shadowColor: 'white',
        fontSize: 36,
        color: '#dcfd50',
        marginBottom: 10,
    }
});