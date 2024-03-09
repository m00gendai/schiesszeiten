import CantonFilters from "./CantonFilters/CantonFilters"
import {swissCantons} from "./lib"
import ListView from "./ListView/ListView"
import { getShootingType } from "./utils"
import Paginate from "./Pagination/Pagination"

interface Props{
    searchParams: {[key: string]: string | string[] | undefined}
}

async function fetchShootingDays(cantons:string[], event:number, display: number, page: number){
    const date:Date = new Date()
    const requestBody = {
        "startRow": (page*display)-display,
        "endRow": (page*display),
        "includeCount": true,
        "filterModels": {
            "from": {
                "filterType": "date",
                "variant": "greaterThanOrEqual",
                "filter": `${date.toISOString()}`
            },
            "type": {
                "filterType": "number",
                "variant": "equals",
                "filter": event
            },
            "canton": {
                "filterType": "multi-select",
                "variant": "singleTargetInListString",
                "filter": cantons
            },
            "disciplineShortNameGerman": {
                "filterType": "multi-select",
                "variant": "singleTargetInListString",
                "filter": ["G300", "P50", "P25", "P25 + P50"]
            }
        },
        "sortModel": [
            {
                "columnId": "from",
                "sort": "asc"
            }
        ]
    }

    console.log(requestBody)

    const getShootingDays:Response = await fetch(`https://www.sat.admin.ch/api/ShootingDayDeclaration/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })

    const shootingDays:ShootingDays = await getShootingDays.json()
    return shootingDays
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
    const currentPage = paramsPage ? paramsPage : defaultPage


    const shootingDays: ShootingDays = await fetchShootingDays(cantons, event, display, currentPage)

    return(
        <div>
        <CantonFilters />
        <ListView shootingDays={shootingDays} event={getShootingType(event)}/>
        <Paginate count={shootingDays.totalItems} display={display}/>
        </div>
    )
}