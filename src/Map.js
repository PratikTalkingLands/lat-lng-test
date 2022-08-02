import React from "react";
import './App.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, CircleMarker, Polyline, ScaleControl } from 'react-leaflet';
import { map } from "leaflet";
import { useMemo } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
// import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Sidenav from './Sidenav'
// Starting point of map
const center = {
  lat: 12.971599,
  lng: 77.594566,
}

// const newLat = marker.getLatLng().lat;
// const newLng = marker.getLatLng().lng;
// Dragging and getting lat lng start
function Map() {
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const [latpoints, setlatpoints] = useState('')
  const [lngpoints, setlngpoints] = useState('')

  const eventHandlers = useMemo(() => ({
    //function to get lat-lng after setting point
    dragend() {
      const marker = markerRef.current
      setlatpoints(marker.getLatLng())
      setlngpoints(marker.getLatLng().lng)
      // console.log(marker.getBounds())
    },
  }),
    [],
  )
  const draggable = true;
  return (
    <div id="map" className="map-view">
      <div>
        <Sidenav latpoints={latpoints} lngpoints={lngpoints} />  {/*Passing lat-lng to the form*/}
      </div>
      {/* <Sidenav latpoints={latpoints} lngpoints={lngpoints}/> */}
      <div className="map-container">
        <MapContainer center={center} zoom={16} scrollWheelZoom={true} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}
            draggable={draggable}
            eventHandlers={eventHandlers}
            //position={position}
            ref={markerRef}></Marker>

        </MapContainer>
      </div>
      {/* <MapContainer center={[51.505, -0.09]} zoom={18} scrollWheelZoom={false} >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}
            draggable={draggable}
            eventHandlers={eventHandlers}
            //position={position}
            ref={markerRef}></Marker>
        
        </MapContainer> */}
    </div>
  );
}

export default Map;
