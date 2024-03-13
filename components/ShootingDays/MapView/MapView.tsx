import s from "./MapView.module.css"
import Map from "./Map"
import { MarkerData } from "./Interface_MapView"
import Paginate from "../Pagination/Pagination"

interface Props{
    shootingDays: ShootingDays
    event: string | undefined
    display: number
}

async function convertSwissgrid(coord1:string, coord2:string){
    // The coordinates from the Shooting Days are, for SOME GODFORSAKEN REASON, in LV03
   const getCoordinates = await fetch(`https://geodesy.geo.admin.ch/reframe/lv03towgs84?easting=${coord1}&northing=${coord2}&format=json`)
   return await getCoordinates.json()
}

export default async function MapView({shootingDays, event, display}:Props){

    const dateOptions:Intl.DateTimeFormatOptions = {
        year: "numeric", 
        month: "2-digit",
        day: "2-digit"
    }

    const markerData:MarkerData[] = await Promise.all(shootingDays.items.map(async item=>{
        return {
            coordinates: await convertSwissgrid(item.coordinates.split("/")[0], (item.coordinates.split("/")[1])),
            place: item.firingRangeName,
            club: item.organizationName,
            event: item.event,
            dateStart: item.from,
            dateEnd: item.to
        }
    }))
    const coords: {easting: string, northing: string}[] = []
    markerData.forEach(marker =>{
        const grid = marker.coordinates
            if(!coords.find(element => element.northing === grid.northing && element.easting === grid.easting)){
                coords.push(grid)
            }
    })

    return(
        <div className={s.container}>
            <h1>{event}</h1>
            <p>{`${new Date(markerData[0].dateStart).toLocaleDateString("de-CH", dateOptions)} - ${new Date(markerData[markerData.length-1].dateStart).toLocaleDateString("de-CH", dateOptions)}`}</p>
            <Map coords={coords} markerData={markerData}/>
            <Paginate count={shootingDays.totalItems} display={display}/>
        </div>
    )
}