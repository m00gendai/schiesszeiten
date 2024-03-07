"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"

function setCantons(router:AppRouterInstance, path:string, params:ReadonlyURLSearchParams, canton:string){
    const cantonParams = params.get("cantons")
    const currentCantons = cantonParams?.split(",") || []
    if(!currentCantons.includes(canton)){
        const newCantons = [...currentCantons, canton]
        const newPath = `${path}?cantons=${newCantons.join(",")}`
        router.push(newPath)
    }
}


export default function Buttin(){

    const router:AppRouterInstance = useRouter()
    const path:string = usePathname()
    const params:ReadonlyURLSearchParams = useSearchParams()


    return(
        <button onClick={()=>setCantons(router, path, params, "TI")}>CANTON TI</button>
    )
}