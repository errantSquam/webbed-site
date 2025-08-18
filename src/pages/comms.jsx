import { React, useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import SplashScreen from "../components/splashscreen"
import { Invisidiv, Invisidiv2 } from "../stylesfunctions/meeboviescript"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useRef } from "react"
import GeneralTab from "./tabs/generalTab"
import { LightHr, Header } from "../components/tosComponents"
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react"
import { TableOfContents } from "../components/tosComponents"
import { chickenLoading } from "../components/splashscreen"
import ExampleTab from "./tabs/exampleTab"


const FeesTab = () => {
    return <div> WIP </div>
    return <div> 
        These are generally a rule of thumb for my own consistency. Many of these fees can be waived/scoped down. Please reach out and discuss with me!
        <Header>REALISM/DETAILS</Header>
        <div>Realistic Human Faces (IRL pictures, Yakuza characters):
(Render only. Chibis will be stylized. Please provide detailed and high quality references.)
Render: $50+

Wings (Realistic Overlaps)
Chibi: $10+
Render: $50+

Note: Does not stack with ‘feather texture’ fee from above if wings are the only feathered part of the character.

If character is already a bird/dinosaur, fee may be waived (depending on detail level).
</div>
        <Header>GEOMETRIC FORMS/MECHA </Header>
    </div>
}



const MotionTab = ({ tabDict, direction }) => {
    let tab = tabDict.tab

    const variants = {
        hidden: (direction) => {

            return {
                x: !direction ? "-25%" : "25%",
                opacity: "0%"
            }
        },
        hiddenExit: (direction) => ({
            x: direction ? "-25%" : "25%",
            opacity: "0%"
        }),
        visible: { opacity: "100%", x: "0%" }

    }


    return <motion.div className="w-full flex flex-col items-center"
        initial="hidden"
        animate="visible"
        exit="hiddenExit"
        variants={variants}
        custom={direction}
        transition={{ duration: 0.1 }}
    >{tab}

    </motion.div>
}

const TabDisplay = ({ tabDict, handleTabSetting }) => {
    let tabList = Object.keys(tabDict).map((id) => {
        let fullName = tabDict[id].fullName
        return <div
            onClick={() => handleTabSetting(id)}
            key={id}
            className="cursor-pointer select-none"
        >
            {fullName}
        </div>
    }).reduce((prev, curr) => {
        return [prev, <span>|</span>, curr]
    })

    return <div className="flex flex-row gap-x-2"> {tabList} </div>

}

export default function Commissions() {
    const [currentTab, setCurrentTab] = useState("gen")
    const [prevTab, setPrevTab] = useState("gen")
    const [isLoading, setIsLoading] = useState(true)
    const [portfolioJson, setPortfolioJson] = useState({})

    const tabDict = {
        "gen": {
            fullName: "General Info",
            tab: <GeneralTab />,
            index: 0
        },
        "eg": {
            fullName: "Examples",
            tab: <ExampleTab portfolioJson={portfolioJson} />,
            index: 1
        },
        "fees": {
            fullName: "Additional Fees",
            tab: <FeesTab />,
            index: 2
        }
    }

    useEffect(() => {
        fetch('assets/portfolio.json').then((res) => res.json()).then((portfolioData) => {
            setPortfolioJson(portfolioData)
        })
    }, [])

    let direction = tabDict[prevTab].index > tabDict[currentTab].index

    function handleTabSetting(tab) {
        if (tab === currentTab) { return }
        setPrevTab(currentTab)
        setCurrentTab(tab)
    }

    useEffect(() => {
        chickenLoading(300, setIsLoading)
    }, [])


    return <div>
        <SplashScreen isLoading={isLoading} />
        <Invisidiv />
        <Invisidiv2 />
        <div className="min-h-screen w-screen bg-zinc-800 text-zinc-300 items-center justify-start flex flex-col py-5 px-5 md:px-10">
            <div className="text-xl font-pirulen text-white text-center" id="top"><Invisidiv />Commissions Terms of Service</div>


            <div className="italic text-sm text-zinc-400 text-center mb-2">
                <div><Invisidiv2 />The following Terms of Service applies to all commissions done by me as of 8/16/2025.</div>
                <div className="text-zinc-500"><Invisidiv />Older history can be found in the&nbsp;
                    <a href="https://docs.google.com/document/d/1B365iEcvkfWhlkAXWI68TWcenYIIWvejCQOE5elOww8/edit?usp=sharing">
                        <u>Google Docs</u>
                    </a>. </div>
            </div>
            <Invisidiv />
            <Invisidiv2 />
            <TabDisplay
                tabDict={tabDict}
                handleTabSetting={handleTabSetting} />
            <hr className="w-3/4" />

            <div className="w-3/4">
                <AnimatePresence mode="wait" custom={direction}>
                    {<MotionTab tabDict={tabDict[currentTab]} direction={direction} key={tabDict[currentTab].fullName} />}
                </AnimatePresence>
            </div>

            <hr className="w-3/4" />
            <div className="italic py-2"
                onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: 'smooth' })}
            > Done reading? <u className="cursor-pointer">Back to top</u></div>
        </div>
    </div>
}