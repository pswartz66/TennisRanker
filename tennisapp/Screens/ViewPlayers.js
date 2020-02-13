import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

// This page will show a list of all players and will allow the user to select a player to edit and will redirect to the ViewPlayer page.
// I think the user should be redirected here once they login.
export default class ViewPlayers extends React.Component {
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
                <Text>View Players page- for viewing all players and maybe bracket?</Text>
            </View>
        )
    }
}