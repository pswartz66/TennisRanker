import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class AddData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    };

    render() {
        return (
            <View>
                <Text>Add Data page! For adding a new player?</Text>
            </View>
        )
    }
}
