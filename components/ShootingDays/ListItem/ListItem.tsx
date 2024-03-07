import { getIcon } from "../utils"
import s from "./ListItem.module.css"
import Image from "next/image"

interface Props{
    shootingDay: ShootingDay
}

export default function ListItem({shootingDay}:Props){

    const dateOptions:Intl.DateTimeFormatOptions = {
        year: "numeric", 
        month: "2-digit",
        day: "2-digit"
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit"
    }    

    return(
        <div className={s.container}>
            <div className={s.dateTime}>
                <div className={s.date}>
                    {new Date(shootingDay.from).toLocaleDateString("de-CH", dateOptions)}
                </div>
                <div className={s.time}>
                {`${new Date(shootingDay.from).toLocaleTimeString("de-CH", timeOptions)} - ${new Date(shootingDay.to).toLocaleTimeString("de-CH", timeOptions)}`}
                </div>
            </div>
            <div className={s.info}>
                <div className={s.place}>
                    {shootingDay.firingRangeName}
                </div>
                <div className={s.club}>
                    {shootingDay.organizationName}
                </div>
            </div>
            <div className={s.image}>
                <Image 
                    src={getIcon(shootingDay.disciplineShortNameGerman)}
                    fill={true}
                    style={{objectFit: "contain"}}
                    alt={"Pistole 50/25m"}
                />
            </div>
            <div className={s.map}>
                
            </div>
        </div>
    )
}