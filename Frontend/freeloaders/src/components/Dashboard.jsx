import { useState } from "react"
import Charts from './Charts'
import Profile from "./Profile";

const pages = {
    "profile": <Profile/>,
    "charts": <Charts/>,
}

export default function Dashboard({page}){
    
    return (
        <div className="dashboard">
            {pages[page]}
        </div>
    )
}