import React from 'react'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Map() {
    const { isLoaded } = useLoadScript({googleMapsApiKey: "AIzaSyBoxTEulnUIiNw2r7U9pqv4lEHyzXzFy9o"});

    if(!isLoaded) return <div>Cargando...</div>

  return (
    <GoogleMap
        zoom={20}  center={{lat:4.1315142, lng: -73.6299722}} mapContainerClassName="w-full h-96 map-container"
    >
        <Marker position={{lat:4.1315142, lng: -73.6299660}} />
        <Marker position={{lat:4.1315142, lng: -73.6299660}} />    
    </GoogleMap>
  )
}


export default Map