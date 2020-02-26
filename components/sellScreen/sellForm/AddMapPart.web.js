import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import ImageMarker from "../../../assets/images/marker.png";

const AnyReactComponent = ({ text }) => <img src={ImageMarker} />;

function AddMapPart({ navigation, route, address, setAddress, setPinLocation, pinLocation, setlatlong, latlong }) {
    const [location, setLocation] = useState({
        center: {
            lat: 59.95,
            lng: 30.33
        }, zoom: 11
    })

    return (
        <div style={{ height: 250, width: '100%' }}
            onClick={() => navigation.navigate('MainMapPart', {
                latlong: latlong,
                setlatlong: setlatlong,
                pinLocation: pinLocation,
                setPinLocation: setPinLocation,
                address: address,
                setAddress: setAddress
            })}>
            <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDL4bGpcflipvkmToDwc_ELWpVxU75vuwM' }}
                    defaultCenter={{ lat: latlong.latitude, lng: latlong.longitude }}
                    defaultZoom={location.zoom}
                >
                    <AnyReactComponent
                        lat={pinLocation.latitude}
                        lng={pinLocation.longitude}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}

export default AddMapPart
