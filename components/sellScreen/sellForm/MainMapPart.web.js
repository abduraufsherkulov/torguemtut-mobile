import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import ImageMarker from "../../../assets/images/marker.png";
import { useHeaderHeight } from '@react-navigation/stack';
import axios from 'axios';
import { Button } from 'react-native-elements'

// const AnyReactComponent = ({ text }) => <img style={{ width: '20px', height: '20px' }} src={ImageMarker} />;
const Marker = ({ text }) => <div>here</div>;
function MainMapPart({ navigation, route }) {
    let { latlong, setlatlong, pinLocation, setPinLocation, setAddress } = route.params;
    const [test, setTest] = useState({
        lat: pinLocation.latitude,
        lng: pinLocation.longitude
    })
    navigation.setOptions({
        headerTitle: '',
        headerRight: () => (
            <Button loading={false} type="clear" onPress={() => navigation.goBack()} title={'Готова'} />
        )
    })

    const headerHeight = useHeaderHeight();
    const [location, setLocation] = useState({
        center: {
            lat: 59.95,
            lng: 30.33
        }, zoom: 11
    })
    const [draggable, setDraggable] = useState(true)


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

    const onChildMouseDown = (childKey, childProps, mouse) => {
        setDraggable(false)
        setPinLocation({ latitude: mouse.lat, longitude: mouse.lng })
    }

    const onChildMouseMove = (childKey, childProps, mouse) => {
        console.log('onChildMouseMove', mouse.lat, mouse.lng)
        // setPinLocation({ latitude: mouse.lat, longitude: mouse.lng })
        setTest({ lat: mouse.lat, lng: mouse.lng })

    }

    const onChildMouseUp = (childKey, childProps, mouse) => {
        setDraggable(true)
        // setPinLocation({ latitude: mouse.lat, longitude: mouse.lng })
        // setTest(mouse)
        // console.log('onChildMouseUp', childKey, childProps, mouse)
    }
    return (
        <div style={{ height: `calc(100vh - ${headerHeight}px)`, width: '100%' }}>
            <GoogleMapReact
                draggable={draggable}
                bootstrapURLKeys={{ key: 'AIzaSyDL4bGpcflipvkmToDwc_ELWpVxU75vuwM' }}
                defaultCenter={{ lat: latlong.latitude, lng: latlong.longitude }}
                defaultZoom={location.zoom}
                onChildMouseDown={onChildMouseDown}
                onChildMouseUp={onChildMouseUp}
                onChildMouseMove={onChildMouseMove}
            >
                <Marker
                    className="place"
                    lat={test.lat}
                    lng={test.lng}
                />
            </GoogleMapReact>
        </div >
    )
}


export default MainMapPart
