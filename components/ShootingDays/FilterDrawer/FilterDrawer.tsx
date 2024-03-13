"use client"

import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Tabs, Space } from '@mantine/core';
import s from "./FilterDrawer.module.css"
import CantonFilters from './CantonFilters/CantonFilters';
import EventFilter from './EventFilter/EventFilter';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { setParams } from '../utils';

function setView(router:AppRouterInstance, path:string, params:ReadonlyURLSearchParams, view: string){
    const newParams = new URLSearchParams(params) 
    newParams.delete("view")
    newParams.append("view", view)
    setParams(router,path,newParams)
}

export default function FilterDrawer(){

    const router:AppRouterInstance = useRouter()
    const path:string = usePathname()
    const params:ReadonlyURLSearchParams = useSearchParams()
    const viewParams = params.get("view")

    const [opened, { open, close }] = useDisclosure(false);
    
    return(
        <>
        <Drawer opened={opened} onClose={close} title="Filter" className={s.desktop} size={"25vw"} lockScroll={false} zIndex={999}>
            <Tabs defaultValue="cantons">
                <Tabs.List >
                    <Tabs.Tab value="cantons">
                        Kantone
                    </Tabs.Tab>
                    <Tabs.Tab value="events">
                        Anlässe
                    </Tabs.Tab>
                </Tabs.List>
                <Space h="md" />
                <Tabs.Panel value="cantons">
                    <CantonFilters />
                </Tabs.Panel>
                <Tabs.Panel value="events">
                    <EventFilter />
                </Tabs.Panel>
            </Tabs>
        </Drawer>
        <Drawer opened={opened} onClose={close} title="Filter" className={s.mobile} size={"100vw"} lockScroll={false}>
            <Tabs defaultValue="cantons">
                <Tabs.List >
                    <Tabs.Tab value="cantons">
                        Kantone
                    </Tabs.Tab>
                    <Tabs.Tab value="events">
                        Anlässe
                    </Tabs.Tab>
                </Tabs.List>
                <Space h="md" />
                <Tabs.Panel value="cantons">
                    <CantonFilters />
                </Tabs.Panel>
                <Tabs.Panel value="events">
                    <EventFilter />
                </Tabs.Panel>
            </Tabs>
        </Drawer>
        <div className={s.buttonRow}>
            <Button className={s.desktop} onClick={open}>Filter</Button>
            <Button className={s.mobile} onClick={open}>Filter</Button>
            <Button onClick={()=>setView(router, path, params, "list")}>Liste</Button>
            <Button onClick={()=>setView(router, path, params, "map")}>Karte</Button>
        </div>
        </>
    )
}