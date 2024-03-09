"use client"

import { LayerGroup, MapContainer, Marker, Popup, Rectangle, TileLayer, useMap } from "react-leaflet"
import s from "./MapView.module.css"
import { MarkerData } from "./Interface_MapView"
import { useMemo, useRef, useState } from "react"
import { LatLngBoundsExpression } from "leaflet"

interface Props{
    markerData: MarkerData[]
}

export default function Map({markerData}:Props){

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

    const boundsArray = initialBounds.filter(item=> item !== undefined) as number[][]


    function SetBoundsRectangles() {
        const [bounds, setBounds] = useState<LatLngBoundsExpression>(boundsArray as LatLngBoundsExpression)
        const map = useMap()
      
        const innerHandlers = useMemo(() => {
            
              setBounds(bounds)
              map.fitBounds(bounds)
                    },
          [map]
        )
      
        return (
            
            <Rectangle
              bounds={bounds}
              /*@ts-expect-error*/
              eventHandlers={innerHandlers}
              pathOptions={{color: "rgba(0,0,0,0"}}
            />
        )
      }
      
    return(
        <MapContainer center={[46.80, 8.22]} zoom={8} scrollWheelZoom={false} className={s.map} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerData.map((marker, index)=>{
            if(marker.coordinates.easting){
                return(
                    <Marker key={`marker_${index}`} position={[parseFloat(marker.coordinates.northing), parseFloat(marker.coordinates.easting)]}>
                        <Popup>
                            <p style={{whiteSpace: "pre"}}>{`${new Date(marker.dateStart).toLocaleDateString("de-CH", dateOptions)} ${new Date(marker.dateStart).toLocaleTimeString("de-CH", timeOptions)} - ${new Date(marker.dateEnd).toLocaleTimeString("de-CH", timeOptions)}\n${marker.event}\n${marker.place}\n${marker.club}`}</p>
                        </Popup>
                    </Marker>
                )
            }
        })}
         <SetBoundsRectangles />
      </MapContainer>
    )
}