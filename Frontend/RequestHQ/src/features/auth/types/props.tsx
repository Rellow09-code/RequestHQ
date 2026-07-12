import type { Dispatch, SetStateAction } from "react"

interface SetStateProp{
    setPage: Dispatch<SetStateAction<number>>
}

export type {SetStateProp}