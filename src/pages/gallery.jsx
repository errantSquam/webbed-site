import { React, useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


export default function Gallery() {

    const [portfolioJson, setPortfolioJson] = useState({})
    const [portfolioTags, setPortfolioTags] = useState({})
    const tagsColorDict = {
        "oc": "bg-amber-400",
        "bg": "bg-purple-400",
        "medium": "bg-blue-400",
        "charatype": "bg-fuchsia-400",
        "copyright": "bg-indigo-400",
        "scope": "bg-red-400",
        "species": "bg-teal-400",
        "source": "bg-green-400",
        "misc": "bg-slate-400"
    }

    const numGalleryCols = 3


    useEffect(() => {
        fetch('assets/portfolio.json').then((res) => res.json()).then((data) => {
            setPortfolioJson(data)

        })
        fetch('assets/portfoliotags.json').then((res) => res.json()).then((data) => {
            setPortfolioTags(data)

        })

    }, [])

    let jsonRange = [...Array(Math.floor(Object.keys(portfolioJson).length / numGalleryCols)).keys()]

    const TagBlock = ({ tagData }) => {
        return <div className={"px-2 py-1 text-xs text-white rounded " + tagsColorDict[tagData.tagType]}>{tagData.fullName}</div>
    }

    const GalleryImage = ({ filename }) => {
        let [isOpen, setIsOpen] = useState(false)

        function open() {
            setIsOpen(true)
        }

        function close() {
            setIsOpen(false)
        }

        let fullTags = portfolioJson[filename].tags.map((tag) => {
            return Object.keys(portfolioTags).length !== 0 && portfolioTags[tag]
        })

        let artDesc = portfolioJson[filename].description

        console.log(fullTags)


        return <>
            <img src={"assets/pics/" + filename}
                className={"object-cover h-64"}
                key={filename}
                onClick={() => setIsOpen(true)} />



            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-between ">
                        <DialogPanel
                            transition
                            className="w-full rounded-xl bg-black/70 p-6 duration-50 ease-in 
                            data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">

                            </DialogTitle>
                            <div className="flex items-center justify-center">
                                <div className="flex flex-row w-3/4 h-2/3">
                                    <div className = "flex flex-col space-y-2">
                                        <p className="mt-2 text-sm/6 text-white/50">
                                            <div className="flex flex-row flex-wrap space-x-2 gap-y-2">
                                                {fullTags.map((tag) => (<TagBlock tagData={tag} />))}
                                            </div>
                                        </p>
                                        <p className = "text-white"><b>Description: </b>
                                            {artDesc !== "" ? artDesc : <i>None</i> }
                                        </p>
                                        
                                        <div className="mt-4">
                                            <Button
                                                className="inline-flex items-center gap-2 rounded-md 
                                    bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white 
                                    shadow-inner shadow-white/10 focus:not-data-focus:outline-none 
                                    data-focus:outline data-focus:outline-white data-hover:bg-gray-600 
                                    data-open:bg-gray-700"
                                                onClick={close}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                    <img src={"assets/pics/" + filename} className={"" + 
                                        portfolioJson[filename].isVertical ? "max-w-4/5" : "max-w-sm "}/>


                                </div>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

        </>

    }


    return (
        <div className="bg-slate-800">
            <div className="py-10 px-10 flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-orange-600">Gallery</h1>
                <div className="text-green-400">pics go here</div>
                <div className="text-green-400">back to <Link to="/"><u>home</u></Link></div>
                <div className="flex flex-row justify-evenly flex-wrap w-4/5 p-5 gap-y-2">
                    {
                        Object.keys(portfolioJson).map((filename) => {
                            console.log(filename)
                            return <div className=" p-1">
                                <GalleryImage filename={filename} />
                            </div>

                        })
                    }

                </div>
            </div>
        </div>

    )

}


{/*<div className="flex flex-col px-10 w-2/3">
                {jsonRange.map((index) => {
                    return <div className="flex flex-row" key={index}>
                        {
                            [...Array(numGalleryCols).keys()].map((filenameIndex) => {
                                let filename = Object.keys(portfolioJson)[(index + 1) * numGalleryCols + filenameIndex - 1]
                                console.log(filename)
                                return <img src={"assets/pics/" + filename}
                                    className={"object-contain grow h-64"}
                                    key={filenameIndex} />

                            })
                        }
                    </div>
                })
                }
            </div>
*/}