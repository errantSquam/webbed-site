import { React, useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import SplashScreen from "../components/splashscreen"
import { Invisidiv, Invisidiv2 } from "../stylesfunctions/meeboviescript"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useRef } from "react"
import GeneralTab from "./tabs/generalTab"
import { LightHr, Header } from "../components/tosComponents"

const ExampleTab = () => {
    return <div/>
}

const FeesTab = () => {
    return <div/>
}

const tabDict = {
    "gen" : {
        fullName: "General Info",
        tab: <GeneralTab/>
    },
    "example": {
        fullName: "Examples",
        tab: <ExampleTab/>
    },
    "fees": {
        fullName: "Additional Fees",
        tab: <FeesTab/>
    }
}



export default function Commissions() {
    const [currentTab, setCurrentTab] = useState("gen")

    function handleTabSetting(tab){
        setCurrentTab(tab)
    }


    return <div>
        <Invisidiv/>
        <Invisidiv2/>
        <div className="min-h-screen w-screen bg-zinc-800 text-zinc-300 items-center justify-start flex flex-col py-5 px-5 md:px-10">
        <div className="text-xl font-pirulen text-white text-center" id = "top"><Invisidiv/>Commissions Terms of Service</div>
        
        
        <div className="italic text-sm text-zinc-400 text-center mb-2">
            <div><Invisidiv2/>The following Terms of Service applies to all commissions done by me as of 8/16/2025.</div>
            <div className="text-zinc-500"><Invisidiv/>Older history can be found in the&nbsp;
                <a href="https://docs.google.com/document/d/1B365iEcvkfWhlkAXWI68TWcenYIIWvejCQOE5elOww8/edit?usp=sharing">
                    <u>Google Docs</u>
                </a>. </div>
        </div>
        <Invisidiv/>
        <Invisidiv2/>
        <div>general info | examples | additional fees</div> 

        <GeneralTab/>
        <hr className = "w-3/4"/>
        <div className = "italic py-2"
        onClick = {() => document.getElementById("top")?.scrollIntoView({behavior: 'smooth'})}
        > Done reading? <u className = "cursor-pointer">Back to top</u></div>
        </div>
    </div>
}