import  {fetchShootingDays} from "@/app/actions/fetchShootingDays"
import CantonFilters from "./CantonFilters/CantonFilters"
import {swissCantons} from "./lib"
import ListView from "./ListView/ListView"
import { getShootingType } from "./utils"

interface Props{
    searchParams: {[key: string]: string | string[] | undefined}
    event: number
}


export default async function ShootingDays({searchParams}:Props){
    const defaultCantons = swissCantons
    const paramsCantons = typeof(searchParams.cantons) === "string" ? searchParams.cantons.split(",") : []
    const cantons = paramsCantons.length === 0 ? defaultCantons : paramsCantons

    const defaultEvent = 1
    const paramsEvent = typeof(searchParams.event) === "string" ? parseInt(searchParams.event) : null
    const event = paramsEvent ? paramsEvent : defaultEvent

    const shootingDays: ShootingDays = await fetchShootingDays(cantons, event)

    return(
        <div>
        <CantonFilters />
        <ListView shootingDays={shootingDays} event={getShootingType(event)}/>
        </div>
    )
}