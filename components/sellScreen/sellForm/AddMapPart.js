import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function AddMapPart({ navigation, route, address, setAddress, setPinLocation, pinLocation, setlatlong, latlong }) {

    return (
        <View style={{ width: '100%', height: 150 }}>
            <MapView
                onPress={() => navigation.navigate('MainMapPart', {
                    latlong: latlong,
                    setlatlong: setlatlong,
                    pinLocation: pinLocation,
                    setPinLocation: setPinLocation,
                    address: address,
                    setAddress: setAddress
                })}
                pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false}
                style={styles.mapStyle}
                initialRegion={latlong}
                region={latlong}
            >
                <Marker
                    coordinate={pinLocation}
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
export default AddMapPart
