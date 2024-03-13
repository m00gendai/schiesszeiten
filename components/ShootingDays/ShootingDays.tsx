import {swissCantons} from "./lib"
import ListView from "./ListView/ListView"
import { getShootingType } from "./utils"
import Paginate from "./Pagination/Pagination"
import s from "./ShootingDays.module.css"
import MapView from "./MapView/MapView"
import FilterDrawer from "./FilterDrawer/FilterDrawer"

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

    const defaultView = "list"
    const paramsView = typeof(searchParams.view) === "string" ? searchParams.view : null
    const currentView = paramsView ? paramsView : defaultView


    const shootingDays: ShootingDays = await fetchShootingDays(cantons, event, display, currentPage)

    return(
        <div className={s.container}>
            <div className={s.inner}>
                <FilterDrawer />
                {currentView === "list" ? <ListView shootingDays={shootingDays} event={getShootingType(event)} display={display}/> : null}
                {currentView === "map" ? <MapView shootingDays={shootingDays} event={getShootingType(event)} display={display}/> : null}
                
            </div>
        </div>
    )
}