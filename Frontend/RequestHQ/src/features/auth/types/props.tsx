import type { Dispatch, SetStateAction } from "react"

interface setStateProp{
    setPage: Dispatch<SetStateAction<number>>
}

export type {setStateProp}