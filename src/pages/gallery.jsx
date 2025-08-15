import { React, useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Select from "react-select"
import { createElement } from "react"
import { Skeleton } from "@mui/material"
import tagsColorDict from "../stylesfunctions/tagsColorDict"
import { selectStyles, selectStylesExclude } from "../stylesfunctions/selectStyles"
import { getFilteredArtByPriority } from "../stylesfunctions/artFilter"
import SplashScreen from "../components/splashscreen"
import { TagBlock } from "../components/galleryComponents"
import { TypeAnimation } from "react-type-animation"
import "../stylesfunctions/typeStyle.css"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useSearchParams } from "react-router-dom"

const GallerySelect = ({ onChange, styles, options, value }) => {
    const formatGroupLabel = (data) => (
        <div>
            <span>{data.label}</span>
        </div>
    );

    return <Select
        onChange={onChange}
        styles={styles}
        components={{ IndicatorSeparator: () => null }}
        options={options}
        formatGroupLabel={formatGroupLabel} key={options}
        value={value}
        placeholder="Tag search..."
        isMulti
    />
}

const GalleryFilter = ({ title, onChange, styles, options, value }) => {
    return <div className="flex flex-col w-full">
        <div className="text-green-400 font-pirulen">{title}</div>
        <div className=" text-left text-sm">
            <GallerySelect
                onChange={onChange}
                styles={styles}
                options={options}
                value={value}
            />
        </div>
    </div>
}

export default function Gallery() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [portfolioJson, setPortfolioJson] = useState({})
    const [portfolioTags, setPortfolioTags] = useState({})
    const [groupedTaglist, setGroupedTaglist] = useState([])
    const [selectedFilters, setSelectedFilters] = useState(
        {
            include: [],
            exclude: []
        }
    )
    const [artList, setArtList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentImage, setCurrentImage] = useState("")


    const numGalleryCols = 3


    useEffect(() => {
        fetch('assets/portfolio.json').then((res) => res.json()).then((portfolioData) => {
            setPortfolioJson(portfolioData)

            fetch('assets/portfoliotags.json').then((res) => res.json()).then((portfolioTagData) => {
                setPortfolioTags(portfolioTagData)
                fetch('assets/grouptags.json').then((res) => res.json()).then((data) => {
                    let tempTagList = data


                    let tempGroupTagList = Object.keys(tempTagList).map((tagType) => {
                        return {
                            label: tagType,
                            options: tempTagList[tagType].map((tagName) => {
                                return {
                                    value: tagName,
                                    label: portfolioTagData[tagName].fullName,
                                    "tagType": tagType
                                }
                            })
                        }
                    })
                    setGroupedTaglist(tempGroupTagList)

                    setArtList(getFilteredArtByPriority(portfolioData, selectedFilters))


                }).then(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 500)
                })

            })

        })


    }, [])




    const GalleryImage = ({ filename }) => {
        const [isOpen, setIsOpen] = useState(filename === searchParams.get("art"))
        const [isLoaded, setIsLoaded] = useState(false)

        function handleOpen() {
            setIsOpen(true)
            let paramName = filename.split(" ").join("+")
            history.pushState({}, "Gallery", `#/gallery?art=${paramName}`)
        }

        function handleClose() {
            setIsOpen(false)
            history.pushState({}, "Gallery", "#/gallery")

        }

        function filePath() {
            return filename + "." + portfolioJson[filename].extension

        }

        let fullTags = portfolioJson[filename].tags.map((tag) => {
            return Object.keys(portfolioTags).length !== 0 && portfolioTags[tag]
        })

        let descString = portfolioJson[filename].description


        let artDesc = createElement('span',
            { dangerouslySetInnerHTML: { __html: descString } },
        );


        return <>
            <div className=" p-1 " key={filename}>
                {!isLoaded &&
                    <div className="bg-zinc-900 ">
                        <div className="animate-pulse flex flex-row items-center justify-center shadow-lg ring-2 rounded-lg ring-green-500 shadow-green-500">
                            <div className="absolute z-10 text-green-500 font-bold font-pirulen">LOADING{portfolioJson[filename].tags.includes("3d") && " 3D"}...</div>
                            <Skeleton
                                variant="rectangular"
                                className="bg-zinc-900 rounded-lg "
                                animation="wave">
                                <div className="h-64 object-cover flex flex-col items-center"
                                    style={{
                                        aspectRatio: portfolioJson[filename].dimensions[0] / portfolioJson[filename].dimensions[1]
                                    }} />
                            </Skeleton>
                        </div>
                    </div>
                }

                <img src={"assets/pics/" + filePath()}
                    style={{ height: !isLoaded ? '0' : undefined }}
                    className={"object-cover h-64 rounded-lg transition hover:scale-105 hover:border-2 hover:border-green-400 hover:cursor-pointer"}
                    onClick={() => handleOpen()}
                    onLoad={() => setIsLoaded(true)}
                />

            </div>



            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={handleClose}>
                <div className="fixed inset-0 z-10 w-full h-screen overflow-y-auto bg-black/70">
                    <div className="px-10 flex min-h-full items-center justify-center">
                        <DialogPanel
                            transition
                            className="duration-50 ease-in 
                            data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >

                            <div className="h-full w-full flex items-center justify-center">
                                <div className="flex flex-col md:flex-row justify-center">
                                    <div className={"flex items-center justify-center md:hidden"}>
                                        <img src={"assets/pics/" + filePath()}
                                            className={"max-h-screen py-4"} />
                                    </div>
                                    <div className="flex flex-col justify-between 
                                    md:py-10 
                                    pr-2 md:max-w-1/3">
                                        <div className="flex flex-col space-y-2 items-center md:items-start">
                                            <p className="mt-2 text-sm/6 text-white/50">
                                                <div className="flex flex-row 
                                                items-center justify-center 
                                                md:justify-start
                                                flex-wrap space-x-2 gap-y-2
                                                ">
                                                    {fullTags.map((tag) => (<TagBlock tagData={tag} tagsColorDict={tagsColorDict} />))}
                                                </div>
                                            </p>
                                            <p className="text-white text-sm"><b>Description: </b>
                                                {descString !== "" ? artDesc : <i>None</i>}
                                            </p>




                                        </div>
                                        <div className="mt-4 w-full hidden md:inline">
                                            <Button
                                                className="w-2/3 flex items-center justify-center
                                                    gap-2 rounded-md 
                                        bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white 
                                        shadow-inner shadow-white/10 focus:not-data-focus:outline-none 
                                        data-focus:outline data-focus:outline-white data-hover:bg-gray-600 
                                        data-open:bg-gray-700"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>

                                    <div className={" md:flex items-center justify-center hidden"}>
                                        <img src={"assets/pics/" + filePath()}
                                            className={"max-h-screen py-4"} />
                                    </div>

                                    <div className="mt-4 w-full flex items-center justify-center md:hidden">
                                        <Button
                                            className="w-2/3 flex items-center justify-center
                                                    gap-2 rounded-md 
                                        bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white 
                                        shadow-inner shadow-white/10 focus:not-data-focus:outline-none 
                                        data-focus:outline data-focus:outline-white data-hover:bg-gray-600 
                                        data-open:bg-gray-700"
                                            onClick={handleClose}
                                        >
                                            Close
                                        </Button>
                                    </div>



                                </div>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

        </>

    }


    function handleSelect(options, currKey, oppKey) {
        let tempSelectedFilters = { ...selectedFilters }
        tempSelectedFilters[currKey] = options

        let range = [...Array(options.length).keys()]

        range.map((index) => {
            let option = options[index]
            if (tempSelectedFilters[oppKey].includes(option)) {
                tempSelectedFilters[oppKey] = tempSelectedFilters[oppKey].filter((i) => i !== option)
            }
        })

        setSelectedFilters(tempSelectedFilters)
        setArtList(getFilteredArtByPriority(portfolioJson, tempSelectedFilters))
    }



    return (
        <div className="min-h-screen bg-zinc-800 overflow-x-hidden ">
            {<SplashScreen isLoading={isLoading} />}
            <div className=" md:px-10 flex flex-col items-center text-center">
                <div className="py-1 w-screen bg-orange-900 mb-2 flex flex-row items-center justify-center">
                    <div className="text-2xl font-bold text-orange-100 font-pirulen flex flex-row items-center gap-x-2">
                        <Icon icon = "clarity:eye-solid" className = "text-2xl text-green-300/70"/>
                        <span>
                        Gallery
                        </span>
                        <Icon icon = "clarity:eye-solid" className = "text-2xl text-green-300/70 -ml-0.5"/>

                    </div>
                </div>

                <div className="flex flex-row flex-wrap lg:flex-nowrap w-4/5 gap-x-4">
                    <GalleryFilter
                        title="#INCLUDES"
                        onChange={(options) => { handleSelect(options, "include", "exclude") }}
                        styles={selectStyles}
                        options={groupedTaglist}
                        value={selectedFilters.include}
                    />
                    <GalleryFilter
                        title="#EXCLUDES"
                        onChange={(options) => { handleSelect(options, "exclude", "include") }}
                        styles={selectStylesExclude()}
                        options={groupedTaglist}
                        value={selectedFilters.exclude}
                    />
                </div>
                <div className="text-green-400 mt-2 flex flex-row items-center space-x-2">
                    <Icon icon = "lets-icons:back"/>
                    <span>back to <Link to="/"><u>home</u></Link>
                    <TypeAnimation
                sequence = {[
                    "?",
                    10000,
                    " :)",
                    5000,
                    "?",
                    10000,
                    ". watch snek dance.",
                    2000,
                    "?",
                    10000,
                    ", or maybe not. stay and enjoy the art.",
                    10000,
                    "?",
                    10000
                ]}
                speed = {70}
                cursor = {false}
                className = "type"
                repeat = {Infinity}
                /></span>
                
                </div>

                
                <div className="flex flex-row justify-evenly flex-wrap w-4/5 px-5 py-2 gap-y-2"
                    key={selectedFilters}>
                    {
                        artList.map((filename) => {
                            return <div className="">
                                <GalleryImage filename={filename} />
                            </div>

                        })
                    }
                    </div>
            </div>
        </div>

    )

}
