import ListItem from "../ListItem/ListItem"
import s from "./ListView.module.css"

interface Props{
    shootingDays: ShootingDays
    event: string
}

export default function ListView({shootingDays, event}:Props){
    return(
        <div className={s.container}>
            <h1>{event}</h1>
            {
            shootingDays.items.map(shootingDay=>{
                return <ListItem key={shootingDay.id} shootingDay={shootingDay} />
            })
        }
        </div>
    )
}