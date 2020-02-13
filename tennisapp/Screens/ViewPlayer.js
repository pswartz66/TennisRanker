import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

// This page will show data from a single player. The coach can update their data from here.
export default class ViewPlayer extends React.Component {
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
                <Text>View Player page- for viewing and editing a single player?</Text>
            </View>
        )
    }
}