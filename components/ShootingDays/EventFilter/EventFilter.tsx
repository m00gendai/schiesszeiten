"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { getShootingType, setParams } from "../utils"
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';
import s from "./EventFilter.module.css"
import { useEffect, useState } from "react";

function setEvent(router:AppRouterInstance, path:string, params:ReadonlyURLSearchParams, currentEvent: number){
    const newParams = new URLSearchParams(params) 
    newParams.delete("event")
    newParams.append("event", currentEvent.toString())
    setParams(router,path,newParams)
}



export default function EventFilter(){

    const router:AppRouterInstance = useRouter()
    const path:string = usePathname()
    const params:ReadonlyURLSearchParams = useSearchParams()
    const [opened, { open, close }] = useDisclosure(false);
    const eventParams = params.get("event")
    const [currentEvent, setCurrentEvent] = useState<number>(eventParams ? parseInt(eventParams) : 1)

    useEffect(()=>{
        setEvent(router, path, params, currentEvent)
    },[currentEvent])
    

    const content = Array(6)
    .fill(0)
    .map((_, index) => <Button size="xl" className={s.button} key={`eventButton_${index}`} onClick={()=>setCurrentEvent(index+1)}>{getShootingType(index+1)}</Button>);
    
    return(
        <>
        <Drawer opened={opened} onClose={close} title="Kategorie" className={s.desktop} size={"25%"} lockScroll={false}>
            <div className={s.container}>
                {content}
            </div>
        </Drawer>
        <Button className={s.desktop} onClick={open}>Anlässe</Button>
        </>
    )
}