import React from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity } from 'react-native';


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    // componentDidMount = () => {
    //     this.keyboardDidShowListener = Keyboard.addListener(
    //         //   'keyboardDidShow',
    //         //   this._keyboardDidShow,
    //     );
    //     this.keyboardDidHideListener = Keyboard.addListener(
    //         //   'keyboardDidHide',
    //         //   this._keyboardDidHide,
    //     );
    // }

    // componentWillUnmount = () => {
    //     this.keyboardDidShowListener.remove();
    //     this.keyboardDidHideListener.remove();
    // }


    handleChange = (event) => {
        // const [value, onChangeText] = React.useState('Useless Placeholder');
        const value = event.target.value;
        this.setState({
            name: value
        })

    }

    render() {

        return (
            <View style={styles.LoginView}>
                <View style={styles.TopContainer}>
                    <Text style={styles.TopContainerText}>
                        Log in to Start Ranking
                    </Text>
                </View>
                <View style={styles.LoginView}>
                    <TextInput
                        autoFocus={true}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderColor: 'gray', borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                        onChange={event => this.handleChange(event)}
                        value={this.state.name}
                        placeholder="Username"
                    />
                    <TextInput
                        // autoFocus={true}
                        style={{ backgroundColor: 'white', textAlign: 'center', margin: 12, height: 50, width: 220, borderColor: 'gray', borderWidth: 1, borderRadius: 5, fontSize: 20 }}
                        onChange={event => this.handleChange(event)}
                        value={this.state.name}
                        placeholder="Password"
                    />
                    <TouchableOpacity
                    // onPress={() => alert('Navigate to SignUp')}
                    style={{ width: 220, marginTop: 30, backgroundColor: 'black', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 5, borderWidth: 2, borderColor: '#dcfd50'}}>
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
        shadowColor: 'white',
        fontSize: 30,
        color: '#dcfd50',
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
