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
        <div style={{ height: 150, width: '100%' }}>
            <GoogleMapReact
                onClick={() => navigation.navigate('MainMapPart', {
                    latlong: latlong,
                    setlatlong: setlatlong,
                    pinLocation: pinLocation,
                    setPinLocation: setPinLocation,
                    address: address,
                    setAddress: setAddress
                })}
                bootstrapURLKeys={{ key: 'AIzaSyDL4bGpcflipvkmToDwc_ELWpVxU75vuwM' }}
                defaultCenter={location.center}
                defaultZoom={location.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    )
}

export default AddMapPart
