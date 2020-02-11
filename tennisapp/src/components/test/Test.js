import React from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import Constants from 'expo-constants';

const imgs = [
    {
        id: 0,
        title: 'First Item',
        source: 'https://s3.amazonaws.com/FringeBucket/image_placeholder.png',
    },
    {
        id: 1,
        title: 'Second Item',
        source: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081',
    },
    {
        id: 2,
        title: 'Third Item',
        source: 'https://cdn1.iconfinder.com/data/icons/image-manipulations/100/13-512.png',
    },
];

function imgsList() {
    return imgs.map((image) => {
        return (
            <View>
                <Text key={Math.floor(Math.random * image.id)} style={styles.title} >{image.title}</Text>
                    <Image key={image.id} style={styles.item} source={{ uri: image.source }} onPress={() => Alert.alert('Simple Button pressed')}/> 
            </View>
        )
    })
}

export default function Test() {
    return (
        <SafeAreaView style={styles.container}>
            {imgsList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 16,
        marginHorizontal: 16,
        borderColor: 'black',
        borderWidth: 1,
    },
    title: {
        fontSize: 32,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        textAlign: 'center'
    },
});