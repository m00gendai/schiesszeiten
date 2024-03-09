"use client"

import React, { useRef } from "react"
import { swissCantons } from "../lib"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import s from "./CantonFilters.module.css"
import Image from "next/image"
import { setParams } from "../utils"

function setCantons(router:AppRouterInstance, path:string, params:ReadonlyURLSearchParams, checkboxRef:React.RefObject<(HTMLInputElement[] | null)>, index:number, canton:string){
    const cantonParams = params.get("cantons")
    const currentCantons = cantonParams?.length === 0 ? [] : cantonParams?.split(",") || []
    const newParams = new URLSearchParams(params) 
    newParams.delete("page")
    if(!currentCantons.includes(canton)){
        const newCantons = [...currentCantons, canton]
        newParams.delete("cantons")
        newParams.append("cantons", newCantons.join(","))
        setParams(router,path,newParams)
    } else {
        const newCantons = currentCantons.filter(element => element !== canton)
        if(newCantons.length === 0){
            newParams.delete("cantons")
            setParams(router,path,newParams)
        } else {
            newParams.delete("cantons")
            newParams.append("cantons", newCantons.join(","))
            setParams(router,path,newParams)
        }
    }
    
    const box = checkboxRef.current![index]
    box.checked = !box.checked
}



export default function CantonFilters(){

    const router:AppRouterInstance = useRouter()
    const path:string = usePathname()
    const params:ReadonlyURLSearchParams = useSearchParams()
    const checkboxRef = useRef<(HTMLInputElement[] | null)>([])

    const cantonParams = params.get("cantons")
    const currentCantons = cantonParams?.split(",") || []
    
    return(
        <div className={s.container}>
            {swissCantons.map((canton, index)=>{
                return(
                    <div className={s.box} key={`checkbox_canton_${canton}`} onClick={()=>setCantons(router, path, params, checkboxRef, index, canton)}>
                        <Image
                            src={`/${canton}.png`}
                            fill={true}
                            style={{objectFit: "contain"}}
                            alt={`${canton}`}
                        />
                    <label className={s.label} htmlFor={`checkbox_canton_${canton}`}>{canton}</label>
                    <input ref={(element)=>checkboxRef.current[index] = element} className={s.input} type="checkbox" id={`checkbox_canton_${canton}`} onChange={()=>setCantons(router, path, params, checkboxRef, index, canton)} defaultChecked={currentCantons.includes(canton) ? true : false} ></input>
                    </div>)
            })}
        </div>
    )
}