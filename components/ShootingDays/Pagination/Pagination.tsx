"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { setParams } from "../utils"
import { Pagination } from '@mantine/core';
import { useEffect, useState } from "react"
import s from "./Pagination.module.css"

interface Props{
    count: number
    display: number
}

function setPageNumber(router:AppRouterInstance, path:string, params:ReadonlyURLSearchParams, page:number){
    const newParams = new URLSearchParams(params) 
    newParams.delete("page")
    newParams.append("page", page.toString())
    setParams(router,path, newParams)
}





export default function Paginate({count, display}:Props){

    const router:AppRouterInstance = useRouter()
    const path:string = usePathname()
    const params:ReadonlyURLSearchParams = useSearchParams()
    const pageParams = params.get("page")
    const [isCurrentPage, setCurrentPage] = useState<number>(pageParams ? parseInt(pageParams) : 1)

    const pages:number = Math.ceil(count/display)
    const pagesArray:number[] = Array.from(Array(pages).keys())

    useEffect(()=>{
        setPageNumber(router, path, params, isCurrentPage)
    },[isCurrentPage])

    return(
        <>
        {count > display ?
        <div className={s.container}>
            <Pagination total={pagesArray.length} value={isCurrentPage} onChange={setCurrentPage} withEdges boundaries={2}/>
        </div>
            :
            null}
            </>
    )
}

