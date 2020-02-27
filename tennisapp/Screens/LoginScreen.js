import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { UserPasswordCredential } from "mongodb-stitch-react-native-sdk";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            coachID: undefined,
            error: false
        };
    };

    componentDidMount() {
        const client = this.props.route.params.client;
        if (client.auth.isLoggedIn) {
            this.setState({ coachID: client.auth.user.id })
        }
    }

    //Login function:
    onLogin() {
        const app = this.props.route.params.app;
        const credential = new UserPasswordCredential(this.state.email, this.state.password)
        app.auth.loginWithCredential(credential)
            .then(authedUser => {
                this.setState({ owner_id: authedUser.id, coachID: authedUser.id })
                console.log(`successfully logged in with id: ${authedUser.id}`)
                this.props.navigation.navigate('ViewPlayers',
                    {
                        email: this.state.email,
                        password: this.state.password,
                        coachID: this.state.coachID,
                        app,
                        db: this.state.db
                    })
            })
            .catch(err => {
                this.setState({ error: true })
                console.error(`login failed with error: ${err}`)
            })
    }

    render() {
        return (
            <View style={styles.LoginView}>
                <View style={styles.TopContainer}>
                    <Text style={styles.TopContainerText}>
                        Log in to Rank it
                    </Text>
                </View>
                <View style={styles.LoginView}>
                    <TextInput
                        autoFocus={true}
                        keyboardType={'default'}
                        keyboardAppearance={'dark'}
                        onSubmitEditing={() => { this.firstTextInput.focus(); }}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.text}
                        name='email'
                        placeholder="Email Address"
                    />
                    <TextInput
                        keyboardType={'default'}
                        keyboardAppearance={'dark'}
                        ref={(input) => { this.secondTextInput = input; }}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.text}
                        name='password'
                        placeholder="Password"
                    />
                    <TouchableOpacity
                        onPress={() => this.onLogin()}
                        style={{ width: 260, marginTop: 30, backgroundColor: 'black', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 5, borderWidth: 2, borderColor: '#0959' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    TopContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TopContainerText: {
        fontWeight: 'normal',
        shadowColor: '#0959',
        fontSize: 34,
        color: '#0959',
    },
    LoginView: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'black'
    },
    LoginText: {
        fontWeight: 'bold',
        shadowColor: 'white',
        fontSize: 36,
        color: '#dcfd50',
        marginBottom: 10,
    }
});
