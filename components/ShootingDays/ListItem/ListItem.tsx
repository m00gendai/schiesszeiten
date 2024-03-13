import { getIcon } from "../utils"
import s from "./ListItem.module.css"
import Image from "next/image"
import MapIcon from "@/public/maps.png"
import Link from "next/link"

interface Props{
    shootingDay: ShootingDay
}

async function convertSwissgrid(coord1:string, coord2:string){
    // The coordinates from the Shooting Days are, for SOME GODFORSAKEN REASON, in LV03
   const getCoordinates = await fetch(`https://geodesy.geo.admin.ch/reframe/lv03towgs84?easting=${coord1}&northing=${coord2}&format=json`)
   return await getCoordinates.json()
}

export default async function ListItem({shootingDay}:Props){

    const dateOptions:Intl.DateTimeFormatOptions = {
        year: "numeric", 
        month: "2-digit",
        day: "2-digit"
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit"
    }    

    const coords = await convertSwissgrid(shootingDay.coordinates.split("/")[0], shootingDay.coordinates.split("/")[1])

    return(
        <div className={s.container}>
            <div className={`${s.wrapper}`}>
                <div className={s.dateTime}>
                    <div className={s.date}>
                        {new Date(shootingDay.from).toLocaleDateString("de-CH", dateOptions)}
                    </div>
                    <div className={s.time}>
                    {`${new Date(shootingDay.from).toLocaleTimeString("de-CH", timeOptions)} - ${new Date(shootingDay.to).toLocaleTimeString("de-CH", timeOptions)}`}
                    </div>
                </div>
                <div className={s.info}>
                    <div className={s.event}>
                        {shootingDay.event}
                    </div>
                    <div className={s.place}>
                        {`${shootingDay.firingRangeName}, ${shootingDay.organizationName}`}
                    </div>
                </div>
            </div>
            <div className={`${s.icons}`}>
                <div className={s.iconsInner}>
                    <div className={s.image}>
                        <Image 
                            src={getIcon(shootingDay.disciplineShortNameGerman)}
                            fill={true}
                            style={{objectFit: "contain"}}
                            alt={"Pistole 50/25m"}
                        />
                    </div>
                    <div className={`${s.canton}`}>
                        <Image
                            src={`/${shootingDay.canton}.png`}
                            fill={true}
                            style={{objectFit: "contain"}}
                            alt={`${shootingDay.canton}`}
                        />
                    </div>
                    <Link className={s.map} href={`https://www.google.com/maps/search/?api=1&query=${coords.northing}%2C${coords.easting}`} target="_blank">
                        <Image
                            src={MapIcon}
                            fill={true}
                            style={{objectFit: "contain"}}
                            alt={"Google Maps Link"}
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}