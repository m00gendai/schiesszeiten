"use client"

import React from "react"
import { swissCantons } from "../lib"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"

function setCantons(router:AppRouterInstance, path:string, params:ReadonlyURLSearchParams, canton:string){
    const cantonParams = params.get("cantons")
    const currentCantons = cantonParams?.split(",") || []
    if(!currentCantons.includes(canton)){
        const newCantons = [...currentCantons, canton]
        const newPath = `${path}?cantons=${newCantons.join(",")}`
        router.push(newPath)
    } else {
        const newCantons = currentCantons.filter(element => element !== canton)
        const newPath = `${path}?cantons=${newCantons.join(",")}`
        router.push(newPath)
    }
}

export default function CantonFilters(){

    const router:AppRouterInstance = useRouter()
    const path:string = usePathname()
    const params:ReadonlyURLSearchParams = useSearchParams()
    
    return(
        <div>
            {swissCantons.map(canton=>{
                return(
                    <React.Fragment key={`checkbox_canton_${canton}`}>
                    <label htmlFor={`checkbox_canton_${canton}`}>{canton}</label>
                    <input  type="checkbox" id={`checkbox_canton_${canton}`} onChange={()=>setCantons(router, path, params, canton)}></input>
                    </React.Fragment>)
            })}
        </div>
    )
}