import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

function MainMapPart({ navigation, route }) {
    let { latlong, setlatlong, pinLocation, setPinLocation, setAddress } = route.params;

    navigation.setOptions({
        headerTitle: '',
        headerRight: () => (
            <Button loading={false} type="clear" onPress={() => navigation.goBack()} title={'Готова'} />
        ),
        // headerTitle: userInfo ? `${userInfo.name} ${userInfo.surname}` : 'Мой профиль'
    })

    const handlePinChange = (location) => {
        const abortController = new AbortController();
        setPinLocation(location);
        const myApiKey = 'AIzaSyDL4bGpcflipvkmToDwc_ELWpVxU75vuwM';
        const { latitude, longitude } = pinLocation;

        const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${myApiKey}`;
        axios({
            method: "get",
            url: endpoint
        }).then(response => {
            setAddress(response.data.results[0].formatted_address);
        }).catch(err => {

        })
    }

    return (
        <View style={styles.container}>
            <MapView
                onRegionChangeComplete={(e) => setlatlong(e)}
                initialRegion={latlong} style={styles.mapStyle} >
                <Marker draggable
                    coordinate={pinLocation}
                    onDragEnd={(e) => handlePinChange(e.nativeEvent.coordinate)}
                />

            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: '100%',
        height: '100%',
    },
});
export default MainMapPart
