import s from "./MapView.module.css"
import Map from "./Map"
import { MarkerData } from "./Interface_MapView"

interface Props{
    shootingDays: ShootingDays
}

async function convertSwissgrid(coord1:string, coord2:string){
    // The coordinates from the Shooting Days are, for SOME GODFORSAKEN REASON, in LV03
   const getCoordinates = await fetch(`https://geodesy.geo.admin.ch/reframe/lv03towgs84?easting=${coord1}&northing=${coord2}&format=json`)
   return await getCoordinates.json()
}

export default async function MapView({shootingDays}:Props){

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
            <Map coords={coords} markerData={markerData}/>
        </div>
    )
}