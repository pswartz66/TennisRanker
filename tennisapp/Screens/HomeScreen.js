import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';


export default function HomeScreen ( { navigation }) {

        return (
            <View style={styles.view}>
                <ImageBackground style={styles.homeBackgroundImage} source={require('../img/tennisball.jpg')}>
                    <Text style={styles.text}>Tennis Rank</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={{ marginTop: 10, backgroundColor: 'gray', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: '6px' }}>
                        <Text style={{ fontSize: 22, color: '#fff' }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // onPress={() => alert('Navigate to SignUp')}
                        style={{ marginTop: 18, backgroundColor: 'gray', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: '6px' }}>
                        <Text style={{ fontSize: 22, color: '#fff' }}>SignUp</Text>
                    </TouchableOpacity>

                </ImageBackground>
            </View>
        );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    homeBackgroundImage: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        shadowColor: 'black',
        fontSize: 50,
        color: '#dcfd50',
        marginBottom: 10,
    }
});