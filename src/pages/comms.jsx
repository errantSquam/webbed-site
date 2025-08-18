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
import { useSearchParams } from "react-router-dom"


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

const TabDisplay = ({ tabDict, handleTabSetting, currentTab }) => {
    let tabList = Object.keys(tabDict).map((id) => {
        let fullName = tabDict[id].fullName
        return <div
            onClick={() => handleTabSetting(id)}
            key={id}
            className={`cursor-pointer select-none px-2 transition duration-200 rounded
                ${currentTab === id ? "bg-zinc-600" : "bg-zinc-600/0"}`}
        >
            {fullName}
        </div>
    }).reduce((prev, curr) => {
        return [prev, <span>|</span>, curr]
    })

    return <div className="flex flex-row font-jura font-bold"> 
    {tabList}
    </div>

}

const IntroTab = () => {
    return <div className = "flex flex-col w-full">
        <Header>INTRO</Header>
    Hello, and welcome to my commissions page! <br/>
    Here's what you need to get started:
    <ol className = "list-decimal ml-10 space-y-1">   
        <li>Check the Examples section to see what you'd like.</li>
        <li>Read the General Information section.
            <div className = "list-none ml-3">❗ <b>Important!</b> Once you reach the end, you'll find a <i>magic word</i> to submit your request.</div>
            <div className = "ml-3">(This is proof you agree to the terms, so please don't skip to the end.)</div></li>
        <li>Submit your request!</li>
    </ol>
    <br/>
    Here are some quick links for you:
    <div className = "flex flex-col space-y-2 my-4">
    <a href="https://forms.gle/hepVgfnUVBVBAtNm7">
                <div className={`flex flex-row items-center gap-x-2 text-green-500 
                text-lg bg-zinc-900 rounded-lg w-fit px-2 py-2 font-jura font-bold border-2 border-zinc-500
                transition duration-100
                hover:bg-zinc-700`}>
                    <Icon icon="mdi:arrow-right-bold" className="text-lg" />
                    <span>Submit your request in the form!</span>
                </div>
            </a>
            <Link to="/gallery">
                <div className={`flex flex-row items-center gap-x-2 text-green-500 
                text-lg bg-zinc-900 rounded-lg w-fit px-2 py-2 font-jura font-bold border-2 border-zinc-500
                transition duration-100
                hover:bg-zinc-700`}>
                    <Icon icon="mdi:arrow-right-bold" className="text-lg" />
                    <span>View more examples in the Gallery.</span>
                </div>
            </Link>
    </div>
    </div>
}
export default function Commissions() {
    const [currentTab, setCurrentTab] = useState("intro")
    const [prevTab, setPrevTab] = useState("intro")
    const [isLoading, setIsLoading] = useState(true)
    const [portfolioJson, setPortfolioJson] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()

    const tabDict = {
        "intro": {
            fullName: "Introduction",
            tab: <IntroTab/>,
            index:0
        },
        "eg": {
            fullName: "Examples",
            tab: <ExampleTab portfolioJson={portfolioJson} />,
            index: 1
        },
        "gen": {
            fullName: "General Info",
            tab: <GeneralTab />,
            index: 2
        },
        "fees": {
            fullName: "Additional Fees",
            tab: <FeesTab />,
            index: 3
        }
    }

    useEffect(() => {
        setCurrentTab(searchParams.get("tab"))
        setPrevTab(searchParams.get("tab"))
        fetch('assets/portfolio.json').then((res) => res.json()).then((portfolioData) => {
            setPortfolioJson(portfolioData)
        })
    }, [])

    let direction = tabDict[prevTab].index > tabDict[currentTab].index

    function handleTabSetting(tab) {
        if (tab === currentTab) { return }
        setPrevTab(currentTab)
        setCurrentTab(tab)
        searchParams.set("tab", tab) 
        let urlString = window.location.hash.split("?")[0] + "?tab=" + tab
        history.pushState({}, "Commissions", urlString)

    }

    useEffect(() => {
        chickenLoading(300, setIsLoading)
    }, [])


    return <div>
        <SplashScreen isLoading={isLoading} />
        <Invisidiv />
        <Invisidiv2 />
        <div className="min-h-screen max-w-screen bg-zinc-800 text-zinc-300 items-center justify-start flex flex-col py-5 px-5 md:px-10">
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
                handleTabSetting={handleTabSetting} 
                currentTab = {currentTab}/>
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