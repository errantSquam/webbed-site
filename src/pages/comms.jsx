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
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { chickenLoading } from "../components/splashscreen"


const ImageExample = ({ fileName, portfolioJson, height = "md:h-60" }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }
    let filePath = "assets/pics/" + fileName + "." + portfolioJson[fileName].extension

    return <div>
        <img src={filePath} className={`rounded-md ${height} cursor-pointer border-2 
            border-green-500/0 hover:border-green-500
            m-2

            `} onClick={() => setIsOpen(true)} />
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={handleClose}>
            <div className="fixed inset-0 z-10 w-full h-screen overflow-y-auto bg-black/70">
                <div className="px-10 flex min-h-full items-center justify-center">
                    <DialogPanel
                        transition
                        className="duration-50 ease-in 
                            data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <div className="flex flex-col items-center justify-center h-screen py-4 gap-y-2">
                            <img src={filePath} className={"max-h-4/5 object-scale-down"} />
                            <div className="text-white">
                                <Link to={{
                                    pathname: "/gallery",
                                    search: `?art=${fileName.replace(" ", "+")}`
                                }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <u>View in Gallery</u>
                                </Link>
                            </div>
                            <Button
                                className="flex items-center justify-center
                                                                            gap-2 rounded-md 
                                                                bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white 
                                                                shadow-inner shadow-white/10 focus:not-data-focus:outline-none 
                                                                data-focus:outline data-focus:outline-white data-hover:bg-gray-600 
                                                                data-open:bg-gray-700 cursor-pointer select-none"
                                onClick={handleClose}
                            >
                                Close
                            </Button>

                        </div>



                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </div>

}
const CommExample = ({ title, children }) => {
    return <div>
        <Header> {title}</Header>
        <div>
            {children}

        </div>
    </div>
}

const ChibiTab = ({ portfolioJson }) => {
    return <div id="chibi">
    <CommExample title="Chibi - $45+" portfolioJson={portfolioJson}>
        <div>Chibis have two styles:</div><br />
        <b className="font-jura text-lg">Clean</b>
        <div> Flat/minimally cel shaded by default! However, lines are cleaner and details are evident. More suitable if you want files to print acrylic charms/stickers with (please note commercial fee if not for personal use.)</div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="abel comm sig" portfolioJson={portfolioJson} />
            <ImageExample fileName="rosch comm final" portfolioJson={portfolioJson} />
        </div>
        <b className="font-jura text-lg">Vibrant</b>
        <div> More vibrant/shaded by default, but messier on the details.    </div>
        <div className="flex flex-row flex-wrap">
            <ImageExample fileName="rockuma af" portfolioJson={portfolioJson} />
            <ImageExample fileName="niles af" portfolioJson={portfolioJson} />
        </div>
        <div><Link to={{
            pathname: "/gallery",
            search: `?include=illust,chibi&exclude=shitpost`
        }}
            target="_blank"
            rel="noopener noreferrer"
        >
            <u>View the full list of examples in the Gallery.</u>
        </Link></div>
    </CommExample>
    </div>
}

const BustTab = ({ portfolioJson }) => {
    return <div id="bust">
        <CommExample title="Bust - $60+" portfolioJson={portfolioJson}>
            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="yammark comm" portfolioJson={portfolioJson} />
                <ImageExample fileName="trunswicked comm with sig" portfolioJson={portfolioJson} />
            </div>
            <div><Link to={{
                pathname: "/gallery",
                search: `?include=illust,bust&exclude=shitpost,animated`
            }}
                target="_blank"
                rel="noopener noreferrer"
            >
                <u>View the full list of examples in the Gallery.</u>
            </Link></div>
        </CommExample>
    </div>
}

const HalfbodyTab = ({ portfolioJson }) => {
    return <div id="halfbody">
        <CommExample title="Halfbody - $120+" portfolioJson={portfolioJson}>
            Standard halfbody. Most detailed textures come free (unless stated in Additional Fees), though please specify the level of realism if necessary.
            <br />(e.g. the cat anthros have different levels of fur detail)<br />

            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="danarei comm sig" portfolioJson={portfolioJson} height="md:h-100" />
                <ImageExample fileName="ordell card render 2 finalizing" portfolioJson={portfolioJson} height="md:h-100" />
            </div>
            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="quill comm sig" portfolioJson={portfolioJson} height="md:h-65" />
                <ImageExample fileName="rook comm journal with sig" portfolioJson={portfolioJson} height="md:h-65" />
            </div>
            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="siren comm watermark" portfolioJson={portfolioJson} height="md:h-90" />
            </div>
            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="xuqian doodle" portfolioJson={portfolioJson} height="md:h-65" />
                <ImageExample fileName="sarkis af" portfolioJson={portfolioJson} height="md:h-65" />
            </div>
            <div><Link to={{
                pathname: "/gallery",
                search: `?include=illust,halfbody&exclude=shitpost,animated`
            }}
                target="_blank"
                rel="noopener noreferrer"
            >
                <u>View the full list of examples in the Gallery.</u>
            </Link></div>
        </CommExample>
    </div>
}

const FullbodyTab = ({ portfolioJson }) => {
    return <div id="fullbody">
        <CommExample title="Fullbody - $180+" portfolioJson={portfolioJson}>
            Standard fullbody render. Most of the rules from Halfbody apply here, as well.


            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="ekaitz sword unsheathing small" portfolioJson={portfolioJson} height="md:h-100" />
                <ImageExample fileName="duftmon comm siggy" portfolioJson={portfolioJson} height="md:h-100" />
            </div>
            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="medabots at" portfolioJson={portfolioJson} height="md:h-65" />
                <ImageExample fileName="nick non af" portfolioJson={portfolioJson} height="md:h-65" />
            </div>
            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="digigirl phoenixmon" portfolioJson={portfolioJson} height="md:h-90" />
            </div>
            <div className="flex flex-row flex-wrap">
                <ImageExample fileName="more dell wings render" portfolioJson={portfolioJson} height="md:h-65" />
                <ImageExample fileName="check out this sick new skell" portfolioJson={portfolioJson} height="md:h-65" />
            </div>
            <div><Link to={{
                pathname: "/gallery",
                search: `?include=illust,fullbody&exclude=shitpost,animated`
            }}
                target="_blank"
                rel="noopener noreferrer"
            >
                <u>View the full list of examples in the Gallery.</u>
            </Link></div>
        </CommExample>
    </div>
}
const ExampleTab = ({ portfolioJson }) => {
    return <div className="w-full space-y-4">
        <Header>Examples </Header>
        <TableOfContents tocDict={{
            "chibi": {
                id: "chibi",
                title: "Chibi - $45+"
            },
            "bust": {
                id: "bust",
                title: "Bust- $60+"
            },
            "half": {
                id: "halfbody",
                title: "Halfbody - $120+"
            },
            "full": {
                id: "fullbody",
                title: "Fullbody - $180+"
            }

        }}>
            <p>The following shows various examples of the art offered.</p>
            <p>Price quoted is base price, though some of these examples are more detailed and may cost more. </p>
            <p>Please see 'Additional Fees' for more information!</p>
            <br />
            <p>You can also click on the images to see them in gallery view.</p>

        </TableOfContents>
        <hr />
        <ChibiTab portfolioJson={portfolioJson} />
        <BustTab portfolioJson={portfolioJson} />
        <HalfbodyTab portfolioJson={portfolioJson} />
        <FullbodyTab portfolioJson={portfolioJson} />





    </div>
}

const FeesTab = () => {
    return <div> fees </div>
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