import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    };

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
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                        onChangeText={(text) => this.setState({username: text})}
                        value={this.state.text}
                        name='username'
                        placeholder="Username"
                    />
                    <TextInput
                        keyboardType={'default'}
                        keyboardAppearance={'dark'}
                        ref={(input) => { this.secondTextInput = input; }}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 49, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 18 }}
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.text}
                        name='password'
                        placeholder="Password"
                    />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
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
