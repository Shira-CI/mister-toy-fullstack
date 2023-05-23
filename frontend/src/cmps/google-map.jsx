import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11


    function handleClick({lat, lng}) {
        setCoordinates({lat, lng})
    }
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={coordinates}
                defaultZoom={zoom}
                center={coordinates}
                onClick={handleClick}
            >
                <AnyReactComponent
                    {...coordinates}
                    text="🍎🍎🍎🍎🍎🍎"
                />
            </GoogleMapReact>
        </div>
    );
}