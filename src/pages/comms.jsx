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
import { portfolioData, portfolioTagData, groupTagData} from "../api/galleryAPI"


const FeesTab = ({setCurrentTab}) => {
    const feesToC = {
        "real": {
            id:"real",
            title:"Realism/Details"
        },
        "geometric": {
            id: "geo",
            title: "Geometric Forms/Mecha"
        },
        "commercial":{
            id:"commercial",
            title:"Commercial Fee"
        },
        "other":{
            id:"other",
            title: "Other"
        },
        "quote":{
            id: "quote",
            title: "Discounts & Quotes"
        }

    }
    return <div>
        
        <Header>Additional Fees</Header>
        <TableOfContents tocDict={feesToC}/>
        <br/>
        These are generally a rule of thumb for my own consistency.<br />
        Many of these fees can be waived/scoped down. Please reach out and discuss with me!
        <br /><br />
        <hr />
        <Header id = "real">REALISM/DETAILS</Header>
        <div className="ml-2">
            <div className="font-bold font-jura">Realistic Human Faces (IRL pictures, Yakuza characters):</div>
            <div className="ml-2"><p className="italic">(Render only. Chibis will be stylized. Please provide detailed and high quality references.)</p>

                <p>Render: $50+</p></div>
            <br />
            <div className="font-bold font-jura">Wings (Realistic Overlaps)</div>
            <div className="ml-2">
                <p>Chibi: $10+</p>
                <p>Render: $50+</p>
                <p className="italic">If character is already a bird/dinosaur, fee may be waived (depending on detail level).</p>

            </div>
        </div>
        <br />
        <hr />
        <Header id = "geo">GEOMETRIC FORMS/MECHA </Header>
        <div className="ml-2">
            <div className="italic">Rigid, hard surfaces go here.</div>
            <div className="font-bold font-jura">Props</div>
            <div className="ml-2">
                <p>Simple Weapons (featureless swords, etc): $10-20+</p>
                <p>Complex Weapons (e.g. FE swords, guns): $30-50+</p>
                <p>Instruments (or any geometric form with significant curvature): $50+</p>
            </div>
            <br />
            <div className="font-bold font-jura">Simple Mecha (RX-78, Medabots, simpler Digimon)</div>
            <div className="ml-2">
                <div>Chibi: $10+<br />
                    Portrait: $20+<br />
                    Render: $50+ (For larger ‘simple mecha’ like RX-78)</div>
                <br />
            </div>
            <div className="font-bold font-jura">Complex Mecha (some Ultimate/Mega Digimon, modern Gundam designs, Xenoblade)</div>
            <div className="ml-2">
                <div>Chibi: $50+<br />
                    Portrait: $20-50+ (depends on head complexity)<br />
                    Render: <br />
                    Low Density Design: $100 - 200+ <br />
                    High Density Design: $300 - 500+ (XC, certain Digimon e.g. modern designs and X variants)</div>
                <br />
                <i>Digimon designs are oftentimes inconsistent. If you would like something *specific*, you may be subject to an unclear reference fee. Otherwise, I will go with what I feel is appropriate.</i>
            </div>
            <br />
        </div>
        <hr />
        <Header id  = "commercial">COMMERCIAL FEE</Header>
        <div>Commercial fee is $100 per piece or 10% of the full price, 
            whichever is higher. May be negotiable, let me know about your project specs.</div><br/>
            (<u
            className = "cursor-pointer"
            onClick = {() => {
            setCurrentTab("gen")
            document.getElementById("rights")?.scrollIntoView({ behavior: 'smooth' })
                }}
            > See more detail under 'Image Rights' in General Info.</u>)<br/><br/>
        <hr/>
        <Header id = "other">OTHER</Header>
        <div className="ml-2">
            <div className="italic">For stuff that doesn’t apply to most clients.</div>
            <br />
            <div className="font-bold font-jura">Mimicking Artstyle</div>
            <div>

                <div className="ml-2">
                    Simple Artstyles: $50+<br />
                    Painterly Artstyles: $80+<br />
                    Lined Artstyles: $100+<br /><br />

                    <b>NOTE: DOES NOT APPLY TO THE REGULAR ART STYLE.</b> <br />If you’d like me to emulate artstyles from a different media.
                    Discuss with me in DMs.
                </div>
                <br />
            </div>

            <div className="font-bold font-jura">Dramatic Composition/Foreshortening</div>
            <div>

                <div className="ml-2">
                    Render: $50-200+<br /><br />

                    This typically refers to pieces with multiple characters interacting, elaborate backgrounds, and what have you.<br />
                    Basically, the ‘lock-in’ fee for TCG card art quality.<br /><br />

                    I will likely go back and forth with you on thumbnailing and each step of the piece if you pay this charge, and it will be a more involved process than my usual.<br /><br />

                    This is optional and I’ll confirm with you whether you want to pay that additional charge for a stronger composition. For the majority of clients, this will likely not matter unless you’re a nut about technical art skills.<br />
                </div>
            </div>
            <br />
            <div className="font-bold font-jura">“Unclear Reference” Fee (Xenoblade, FFXIV, certain Mega Digimon, etc.)</div>

            <div className="ml-2">
                Chibi: $30+<br />
                Portrait: $50+<br />
                Render: $100+<br />
                <br />
                This refers to references that are very busy/lack clarity, and typically require me to add an additional round of study of their forms before I actually draw them.
                <br /><br />
                <b>Fee can be waived if you allow me to noodle their forms inaccurately.</b> This usually refers to painterly blobs and possibly blurry/less cohesive structures.
                <br /><br />
                This fee may also apply to backgrounds that lack clarity. Fee may be halved if the design is much simpler (possibly some Digimon), but assume full fees for the most part.
                <br /><br />
                Example: A study of Logos’ Siren from Xenoblade 2 (image greatly compressed to save on load times)
                <img src="assets/misc/siren study logos.webp" />
            </div>

            <br />
            <div className="font-bold font-jura">Falcom Fee</div>
            <div className="ml-2">
                Anything Falcom related. Flat fee of $100 per image.<br />

                If for commercial purposes or Tokyo Xanadu, discuss with me and I may waive this fee.

                If you require a referral to a different artist who can fulfill your request, feel free to ask.
            </div>

            <br />
            <div className="font-bold font-jura">Extremely Clean Lineart/Detailed Hatched/Cross-Hatched Shading:</div>
            <div className="ml-2">Render: +$100<br />
                This is for if you want REALLY clean lineart that’s done in the traditional way,
                without those pesky painterly brushstrokes. None of the examples listed above have
                ‘Extremely Clean Lineart’. In fact, most of the time it’s not even noticeable.
                Highly <b>not recommended,</b> but the option is there.
            </div>
            <br/>
        </div>
        <hr/>
        
        <Header id = "quote"> Discounts & Quotes</Header>
        <b>IF ASKING FOR QUOTE:</b> Please reach out to me via Bluesky DMs OR email at errantsquam@gmail.com. Include reference images (use something like Google Drive, since Bluesky doesn’t support uploads!) and a detailed description, same as if you were submitting the form.
        <br/><br/>
        If you have a budget, I encourage you to discuss this with me so I can see where to streamline things while working within your budget.
        <br/><br/>
        If going through discounted options, you accept that I reserve the right to reject technical critique pertaining to the art piece, as I am intentionally keeping things simpler and looser for the sake of working within your budget.
        <br/><br/>
        (There used to be a section on discounted examples here, but it's clipped for the sake of brevity. Just drop in and ask.)



    </div>
}



const MotionTab = ({ tabDict, direction }) => {
    let tab = tabDict.tab

    const variants = {
        hidden: (direction) => {

            return {
                x: direction ? "-25%" : "25%",
                opacity: "0%"
            }
        },
        hiddenExit: (direction) => ({
            x: !direction ? "-25%" : "25%",
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

    return <div className="flex flex-row flex-wrap items-center justify-center font-jura font-bold">
        {tabList}
    </div>

}

const IntroTab = ({setCurrentTab}) => {
    return <div className="flex flex-col w-full">
        <Header>INTRO</Header>
        <div>Hello, and welcome to my commissions page! <br />
            Here's what you need to get started <i className="text-green-500">(see the tabs above)</i>:</div>
        <ol className="list-decimal ml-10 space-y-1">
            <li>Check the <u className = "cursor-pointer" onClick = {() => setCurrentTab("eg")}>Examples</u> section to see what you'd like.</li>
            <li>Read the <u className = "cursor-pointer" onClick = {() => setCurrentTab("gen")}>General Information</u> section.
                <div className="list-none ml-3">❗ <b>Important!</b> Once you reach the end, you'll find a <i>magic word</i> to submit your request.</div>
                <div className="ml-3">(This is proof you agree to the terms, so please don't skip to the end.)</div></li>
            <li>Submit your request!</li>
        </ol>
        
        
        <br />
        <div>My contact is also available at <b>errantsquam@gmail.com</b>.</div>
        <br/>
        If this isn't your first time reading the ToS, here are some quick links for you:
        <div className="flex flex-col space-y-2 my-4">
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

    const portfolioQuery = portfolioData()

    const tabDict = {
        "intro": {
            fullName: "Introduction",
            tab: <IntroTab setCurrentTab = {handleTabSetting}/>,
            index: 0
        },
        "eg": {
            fullName: "Examples",
            tab: <ExampleTab setCurrentTab = {handleTabSetting}/>,
            index: 1
        },
        "gen": {
            fullName: "General Info",
            tab: <GeneralTab setCurrentTab = {handleTabSetting}/>,
            index: 2
        },
        "fees": {
            fullName: "Additional Fees",
            tab: <FeesTab setCurrentTab = {handleTabSetting}/>,
            index: 3
        }
    }

    useEffect(() => {
        if (searchParams.get("tab") !== null) {
            setCurrentTab(searchParams.get("tab"))
            setPrevTab(searchParams.get("tab"))
        }
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
                currentTab={currentTab} />
            <hr className="w-3/4" />

            <div className="w-3/4">
                <AnimatePresence mode="wait" custom={direction}>
                    {<MotionTab tabDict={tabDict[currentTab]} direction={direction} key={tabDict[currentTab].fullName} />}
                </AnimatePresence>
            </div>

            <hr className="w-3/4" />
            <div className="italic py-2 text-lg"
                onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: 'smooth' })}
            > Done reading? <u className="cursor-pointer">Back to top</u></div>
        </div>
    </div>
}