import  {fetchShootingDays} from "@/app/actions/fetchShootingDays"
import CantonFilters from "./CantonFilters/CantonFilters"
import {swissCantons} from "./lib"
import ListView from "./ListView/ListView"
import { getShootingType } from "./utils"
import Pagination from "./Pagination/Pagination"

interface Props{
    searchParams: {[key: string]: string | string[] | undefined}
}


export default async function ShootingDays({searchParams}:Props){
    const defaultCantons = swissCantons
    const paramsCantons = typeof(searchParams.cantons) === "string" ? searchParams.cantons.split(",") : []
    const cantons = paramsCantons.length === 0 ? defaultCantons : paramsCantons

    const defaultEvent = 1
    const paramsEvent = typeof(searchParams.event) === "string" ? parseInt(searchParams.event) : null
    const event = paramsEvent ? paramsEvent : defaultEvent

    const display = 10

    const defaultPage = 1
    const paramsPage = typeof(searchParams.page) === "string" ? parseInt(searchParams.page) : null
    const page = paramsPage ? paramsPage : defaultPage


    const shootingDays: ShootingDays = await fetchShootingDays(cantons, event, display, page)

    return(
        <div>
        <CantonFilters />
        <ListView shootingDays={shootingDays} event={getShootingType(event)}/>
        <Pagination count={shootingDays.totalItems} display={display} page={page}/>
        </div>
    )
}