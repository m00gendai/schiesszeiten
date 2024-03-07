"use server"

export async function fetchShootingDays(cantons:string[], event:number, display: number, page: number){
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