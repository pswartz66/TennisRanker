import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

export default function HomeScreen ( { navigation }) {

        return (
            <View style={styles.homeView}>
                <ImageBackground style={styles.homeBackgroundImage} source={require('../img/tennisball.jpg')}>
                    <Text style={styles.hometext}>Tennis Rank it.</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={{ width: 190, marginTop: 10, backgroundColor: '#0959', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 6 }}>
                        <Text style={{ textAlign: 'center', fontSize: 22, color: '#fff' }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                        style={{ width: 190, marginTop: 24, backgroundColor: '#059', paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20, borderRadius: 6 }}>
                        <Text style={{ textAlign: 'center', fontSize: 22, color: '#fff' }}>Sign up</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
}

const styles = StyleSheet.create({
    homeView: {
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
    hometext: {
        fontWeight: 'bold',
        shadowColor: 'black',
        fontSize: 50,
        color: '#dcfd50',
        marginBottom: 150,
    }
});