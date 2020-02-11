import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            keyboardVisible: 'false'
        };
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        // this.keyboardDidShowListener = Keyboard.addListener(
        //   'keyboardDidShow',
        //   this._keyboardDidShow,
        // );
        // this.keyboardDidHideListener = Keyboard.addListener(
        //   'keyboardDidHide',
        //   this._keyboardDidHide,
        // );
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
                    <KeyboardAwareScrollView>
                        <TextInput
                            autoFocus={true}
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                            onChange={event => this.handleChange(event)}
                            value={this.state.name}
                            placeholder="First name"
                        />
                        <TextInput
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            ref={(input) => { this.secondTextInput = input; }}
                            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                            onChange={event => this.handleChange(event)}
                            value={this.state.name}
                            placeholder="Last name"
                        />
                        <TextInput
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            ref={(input) => { this.thirdTextInput = input; }}
                            onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                            onChange={event => this.handleChange(event)}
                            value={this.state.name}
                            placeholder="Username"
                        />
                        <TextInput
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            ref={(input) => { this.fourthTextInput = input; }}
                            onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                            onChange={event => this.handleChange(event)}
                            value={this.state.name}
                            placeholder="Password"
                        />
                        <TextInput
                            keyboardType={'default'}
                            keyboardAppearance={'dark'}
                            ref={(input) => { this.fifthTextInput = input; }}
                            onSubmitEditing={() => { console.log('successfully signed up!') }}
                            style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                            onChange={event => this.handleChange(event)}
                            value={this.state.name}
                            placeholder="School"
                        />
                        <TouchableOpacity
                            onPress={() => console.log('Signed up! Redirect to new page')}
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