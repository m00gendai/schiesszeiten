import P5025 from "@/public/p5025.svg"
import P50 from "@/public/p50.svg"
import P25 from "@/public/p25.svg"
import G300 from "@/public/g300.svg"

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