"use client"

import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Tabs, Space } from '@mantine/core';
import s from "./FilterDrawer.module.css"
import CantonFilters from './CantonFilters/CantonFilters';
import EventFilter from './EventFilter/EventFilter';

export default function FilterDrawer(){

    const [opened, { open, close }] = useDisclosure(false);
    
    return(
        <>
        <Drawer opened={opened} onClose={close} title="Filter" className={s.desktop} size={"25vw"} lockScroll={false}>
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
        <Button className={s.desktop} onClick={open}>Filter</Button>
        <Button className={s.mobile} onClick={open}>Filter</Button>
        </>
    )
}