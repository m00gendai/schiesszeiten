import  {fetchShootingDays} from "@/app/actions/fetchShootingDays"
import Buttin from "./Buttin"
import CantonFilters from "./CantonFilters/CantonFilters"
import {swissCantons} from "./lib"

interface Props{
    searchParams: {[key: string]: string | string[] | undefined}
}


export default async function ShootingDays({searchParams}:Props){
    const defaultCantons = swissCantons
const paramsCantons = typeof(searchParams.cantons) === "string" ? searchParams.cantons.split(",") : []
const cantons = paramsCantons.length === 0 ? defaultCantons : paramsCantons

//const cantons = 

    const shootingDays: ShootingDays = await fetchShootingDays(cantons)

    return(
        <div>
        <CantonFilters />
        {
            shootingDays.items.map(shootingDay=>{
                return <p id={shootingDay.id}>{shootingDay.firingRangeName}</p>
            })
        }
        </div>
    )
}