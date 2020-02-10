import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            name: value
        });
    };

    render() {

        return (

            <View style={styles.signupView}>

                <View style={styles.signupTopContainer}>
                    <Text style={styles.signupTopContainerText}>
                        Sign up for Rank it
                    </Text>
                </View>
                <View style={styles.signupView}>
                    <TextInput
                        autoFocus={true}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                        onChange={event => this.handleChange(event)}
                        value={this.state.name}
                        placeholder="Username"
                    />
                    <TextInput
                        autoFocus={true}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                        onChange={event => this.handleChange(event)}
                        value={this.state.name}
                        placeholder="Password"
                    />
                    <TextInput
                        autoFocus={true}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                        onChange={event => this.handleChange(event)}
                        value={this.state.name}
                        placeholder="Gender"
                    />
                    <TextInput
                        autoFocus={true}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                        onChange={event => this.handleChange(event)}
                        value={this.state.name}
                        placeholder="Age"
                    />
                    <TextInput
                        autoFocus={true}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                        onChange={event => this.handleChange(event)}
                        value={this.state.name}
                        placeholder="School Name"
                    />
                    <TouchableOpacity
                    // onPress={() => alert('Navigate to SignUp')}
                    style={{ width: 220, marginTop: 30, backgroundColor: 'black', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 5, borderWidth: 2, borderColor: '#059'}}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Sign up</Text>
                </TouchableOpacity>
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