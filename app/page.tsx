import ShootingDays from "@/components/ShootingDays/ShootingDays"
import "@/globals/globals.css"

export const maxDuration = 30

export default function Home({
  params, 
  searchParams
}:{
  params: {slug: string} 
  searchParams:{[key: string]: string | string[] | undefined
}}) {
  return (
    <ShootingDays searchParams={searchParams}/>
  )
}
      