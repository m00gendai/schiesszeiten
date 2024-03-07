"use client"

import s from "./Pagination.module.css"

interface Props{
    count: number
    display: number
    page: number
}

export default function Pagination({count, page, display}:Props){

    const pages:number = Math.ceil(count/display)
    const pagesArray:number[] = Array.from(Array(pages).keys())

    return(
        <>
        {count > display ?
            <div className={s.container} >
                {pagesArray.map(page=>{
                    return(
                        <div key={`page_${page+1}`}>
                            {page+1}
                        </div>
                    )
                })
                }
            </div>
            :
            null}
            </>
    )
}