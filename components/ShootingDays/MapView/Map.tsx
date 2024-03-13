"use client"

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import s from "./MapView.module.css"
import { MarkerData } from "./Interface_MapView"
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { LatLngBoundsExpression, Map as MapInstance } from "leaflet";


interface Props{
    coords: {easting: string, northing: string}[] 
    markerData: MarkerData[]
}

export default function Map({coords, markerData}:Props){

    const dateOptions:Intl.DateTimeFormatOptions = {
        year: "numeric", 
        month: "2-digit",
        day: "2-digit"
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit"
    } 

    const initialBounds = markerData.map(item=>{
        if(item.coordinates.easting){
            return [parseFloat(item.coordinates.northing), parseFloat(item.coordinates.easting)]
        }       
    })

    const boundsArray = initialBounds.filter(item=> item !== undefined) as LatLngBoundsExpression
    const [map, setMap] = useState<MapInstance | null>(null)

    useEffect(()=>{
        if(map){
            map.fitBounds(boundsArray)
        }
    },[map, boundsArray])
    

    return(
        <MapContainer ref={setMap} center={[46.80, 8.22]} zoom={8} scrollWheelZoom={false} className={s.map} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {coords.map((coord, index)=>{
            if(coord.easting){
                return(
                    <Marker key={`marker_${index}`} position={[parseFloat(coord.northing), parseFloat(coord.easting)]}>
                        <Popup>
                            {markerData.map(marker =>{
                                if(marker.coordinates.easting === coord.easting && marker.coordinates.northing === coord.northing){
                                    return <p style={{whiteSpace: "pre"}} dangerouslySetInnerHTML={{__html: `<strong>${new Date(marker.dateStart).toLocaleDateString("de-CH", dateOptions)}</strong> ${new Date(marker.dateStart).toLocaleTimeString("de-CH", timeOptions)} - ${new Date(marker.dateEnd).toLocaleTimeString("de-CH", timeOptions)}\n${marker.event}\n${marker.place}\n${marker.club}`}}></p>
                                }
                            })}
                        </Popup>
                    </Marker>
                )
            }
        })}

      </MapContainer>
    )
}