import ListItem from "../ListItem/ListItem"
import Paginate from "../Pagination/Pagination"
import s from "./ListView.module.css"

interface Props{
    shootingDays: ShootingDays
    event: string | undefined
    display: number
}

export default function ListView({shootingDays, event, display}:Props){
    return(
        <div className={s.container}>
            <h1>{event}</h1>
            <div className={s.items}>
            {shootingDays.items.map(shootingDay=>{
                return <ListItem key={shootingDay.id} shootingDay={shootingDay} />
            })}
            </div>
            <Paginate count={shootingDays.totalItems} display={display}/>
        </div>
    )
}