import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMap() {
    
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    const BatYam = {
        lat: 32.012776455972286,
        lng: 34.74869023929221
    }
    const Hadera = {
        lat: 32.434693274137175,
        lng: 34.92467570308751
    }
    const TelAviv = {
        lat: 32.08254352124578,
        lng: 34.78128234253979
    }
    
    function handleClick({lat, lng}) {
        setCoordinates({lat, lng})
    }
    return (
        <section>
        <button onClick={()=> handleClick(BatYam)}>Bat Yam</button>
        <button onClick={()=> handleClick(Hadera)}>Hadera</button>
        <button onClick={()=> handleClick(TelAviv)}>Tel Aviv</button>
        
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAzbcR88FFMA9WmJkJDHbCXL9UaeLA9X9c" }}
                defaultCenter={coordinates}
                defaultZoom={zoom}
                center={coordinates}
                onClick={handleClick}
            >
                <AnyReactComponent
                    {...coordinates}
                    text="❌"
                />
            </GoogleMapReact>
        </div>
        </section>
    )
}