import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { UserPasswordAuthProviderClient, UserPasswordCredential } from "mongodb-stitch-react-native-sdk";

export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CoachesDB: [],
            coachID: undefined,
            email: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            school: ''
        };
    };

    componentDidMount() {
        const client = this.props.route.params.client;
        this.setState({ 
            coachID: client.auth.user.id, 
            db: this.props.route.params.db
        })
    }

    // sign up a user with credentials
    // Change this to not login, but create the new user credentials:
    createNewCredentials() {
        const app = this.props.route.params.app;
        const emailPasswordClient = app.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
        emailPasswordClient.registerWithEmail(this.state.email, this.state.password)
            .then(() => this.loginCoach())
            .catch(err => console.error("Error registering new user:", err));
    }

    // Login user:
    loginCoach() {
        const app = this.props.route.params.app;
        const credential = new UserPasswordCredential(this.state.email, this.state.password)
        app.auth.loginWithCredential(credential)
            .then(authedUser => {
                this.setState({owner_id: authedUser.id, coachID: authedUser.id})
                console.log(`successfully signed up with id: ${authedUser.id}`)
                this.createCoach(app)
            })
            .catch(err => {
                this.setState({error: true})
                console.error(`login failed with error: ${err}`)
            })
    }

    // Then Create Coach:
    createCoach(app) {
        this.state.db
            .collection("userinfo")
            .insertOne({
                owner_id: this.state.coachID,
                coachID: this.state.coachID,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                password: this.state.password,
                school: this.state.school
            })
            //What we want to happen here is redirect. We can then display the info once we redirect.
            .then(() => this.props.navigation.navigate('ViewPlayers',
                    {email: this.state.email, 
                     password: this.state.password, 
                     coachID: this.state.coachID, 
                     app}))
            .catch(console.error);
    };

    render() {
        return (
            <View style={styles.signupView}>
                <View style={styles.signupTopContainer}>
                    <Text style={styles.signupTopContainerText}>
                        Sign up for Rank it
                    </Text>
                </View>
                <ScrollView>

                <View style={styles.signupView}>
                        <TextInput
                            autoFocus={true}
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                            onChangeText={(text) => this.setState({ firstName: text })}
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
                            onChangeText={(text) => this.setState({ lastName: text })}
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
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.text}
                            name='username'
                            placeholder="Username"
                        />
                        <TextInput
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            ref={(input) => { this.thirdTextInput = input; }}
                            onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.text}
                            name='email'
                            placeholder="Email address"
                        />
                        <TextInput
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            ref={(input) => { this.fourthTextInput = input; }}
                            onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                            onChangeText={(text) => this.setState({ password: text })}
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
                            onChangeText={(text) => this.setState({ school: text })}
                            value={this.state.text}
                            name='school'
                            placeholder="School"
                        />
                        <TouchableOpacity
                            onPress={() => this.createNewCredentials()}
                            style={{ width: '100%', marginTop: 30, backgroundColor: 'black', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 5, borderWidth: 2, borderColor: '#059' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Sign up</Text>
                        </TouchableOpacity>

                </View>
                </ScrollView>


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