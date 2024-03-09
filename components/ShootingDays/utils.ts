import P5025 from "@/public/p5025.svg"
import P50 from "@/public/p50.svg"
import P25 from "@/public/p25.svg"
import G300 from "@/public/g300.svg"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function getIcon(type:string){
    if(type === "P50"){
        return P50
    }
    if(type === "P25"){
        return P25
    }
    if(type === "P25 + P50"){
        return P5025
    }
    if(type === "G300"){
      return G300
    }
}

export function getShootingType(type:number){
    switch(type){
        case 1:
            return "Obligatorische Übung"
        case 2:
            return "Feldschiessen"
        case 3:
            return "die Jungschützenkurse"
        case 4:
            return "Schützenfeste und Vereinswettkämpfe"
        case 5:
            return "Trainings"
        case 6: 
            return "anderweitige Anlässe"
    }
}

export function setParams(router:AppRouterInstance, path:string, newParams:URLSearchParams){
    router.push(`${path}?${newParams.toString()}`, {scroll: true})
}