"use client"

import React from "react"
import { swissCantons } from "../lib"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import s from "./CantonFilters.module.css"
import Image from "next/image"

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

    const cantonParams = params.get("cantons")
    const currentCantons = cantonParams?.split(",") || []
    
    return(
        <div className={s.container}>
            {swissCantons.map(canton=>{
                return(
                    <div className={s.box} key={`checkbox_canton_${canton}`} onClick={()=>setCantons(router, path, params, canton)}>
                        <Image
                            src={`/${canton}.png`}
                            fill={true}
                            style={{objectFit: "contain"}}
                            alt={`${canton}`}
                        />
                    <label className={s.label} htmlFor={`checkbox_canton_${canton}`}>{canton}</label>
                    <input  className={s.input} type="checkbox" id={`checkbox_canton_${canton}`} checked={currentCantons.includes(canton) ? true : false} ></input>
                    </div>)
            })}
        </div>
    )
}