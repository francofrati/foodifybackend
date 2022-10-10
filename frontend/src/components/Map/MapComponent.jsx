import React, { useEffect, useState } from 'react'

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup, Map, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'


const MapComponent = ({markerState,setMarker}) => {

    const [position, setPosition] = useState([])

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((location) => {
            setPosition([location.coords.latitude, location.coords.longitude])
        },
            (e) => {
                console.log(e)
            })
    }, [])

    const NewMarker = () => {
        const [markerPosition, setMarkerPosition] = useState(null)
        const map = useMapEvents({
            click(e) {
                const lnlt = map.mouseEventToLatLng(e.originalEvent)
                console.log(lnlt)
                setMarkerPosition([lnlt.lat, lnlt.lng])//setMarker de props
            },

        })

        if (!markerPosition) {
            return null
        } else {
            return (
                <Marker position={markerPosition/*markerState de props*/} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                    <Popup>
                        Tu direccion
                    </Popup>
                </Marker>
            )
        }
    }

    return (
        <div style={{ margin: 'auto', width: '800px', height: '600px' }}>
            {position.length &&

                <MapContainer style={{ height: '100%', width: '100%' }} center={position} zoom={14} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <NewMarker />
                </MapContainer>
            }
        </div>

    )
}

export default MapComponent