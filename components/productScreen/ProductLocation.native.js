import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


function ProductLocation({ navigation, route }) {
    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: route.params.latitude,
                    longitude: route.params.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} style={styles.mapStyle} >
                <Marker
                    coordinate={{
                        latitude: route.params.latitude,
                        longitude: route.params.longitude
                    }}
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default ProductLocation
