import { React, useState } from "react"
import Select from "react-select"
import "../stylesfunctions/typeStyle.css"
import { TypeAnimation } from "react-type-animation"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Link } from "react-router-dom"
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react"
import { Button } from "@headlessui/react"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { Skeleton } from "@mui/material"
import { portfolioTagData } from "../api/galleryAPI"
import { createElement } from "react"

import tagsColorDict from "../stylesfunctions/tagsColorDict"
const BackToHome = () => {

    return <Link to="/"><div className="text-green-400 flex flex-row items-center space-x-2">
        <Icon icon="lets-icons:back" />
        <span>back to <u>home</u>
            <TypeAnimation
                sequence={[
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
                speed={70}
                cursor={false}
                className="type"
                repeat={Infinity}
            /></span>

    </div></Link>
}



export const CommissionsButton = () => {
    return <Link to="/commissions"><div className={`text-green-500 flex flex-row space-x-2 items-center justify-center font-jura font-bold
        bg-gradient-to-b from-zinc-700 to-zinc-950 
        border-green-800 border
        px-2 py-1 rounded-md cursor-pointer select-none transition hover:scale-105
        text-lg`}>
        <Icon icon="mdi:art" />
        <div className="text-zinc-300">Order a Commission</div>
    </div></Link>
}

const ContactListing = ({ listingName, listingIcon, listingData }) => {
    return <Link to={listingData} target="_blank" rel="noopener noreferrer">

        <div className="flex flex-row items-center space-x-1 align-middle 
    py-1 px-5 border-green-700 hover:border-green-300 rounded-md border-2
    shrink cursor-pointer justify-center bg-zinc-800 drop-shadow-lg">
            <Icon icon={listingIcon} />
            <p>{listingName}</p>

        </div>
    </Link>
}

export const ContactButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setIsOpen(false)
    }

    return <>
        <div className="flex md:hidden flex flex-row gap-x-5 items-center text-white justify-center text-3xl">
            <a href="https://bsky.app/profile/errantsquam.heckingsne.cc"
                target="_blank"
                rel="noopener noreferrer">
                <Icon icon="ri:bluesky-fill" className="select-none cursor-pointer hover:text-white" />
            </a>
            <a href="https://github.com/errantSquam"
                target="_blank"
                rel="noopener noreferrer">
                <Icon icon="mdi:github" className="select-none cursor-pointer hover:text-white" />
            </a>
            <a href="https://www.xiaohongshu.com/user/profile/677689c50000000018014b73"
                target="_blank"
                rel="noopener noreferrer">
                <Icon icon="simple-icons:xiaohongshu" className="select-none cursor-pointer hover:text-white" />
            </a>
            <a href="https://www.instagram.com/errantsquam/"
                target="_blank"
                rel="noopener noreferrer">
                <Icon icon="mdi:instagram" className="select-none cursor-pointer hover:text-white" />
            </a>
        </div>
        <div className={`text-green-500 flex flex-row space-x-2 items-center justify-center font-jura font-bold
        bg-gradient-to-b from-zinc-700 to-zinc-950 
        border-green-800 border
        px-2 py-1 rounded-md cursor-pointer select-none transition hover:scale-105
        text-lg`}
            onClick={() => setIsOpen(true)}>
            <Icon icon="material-symbols:mail" />
            <div className="text-zinc-300">Contact Me / Socials</div>
        </div>

        <Dialog open={isOpen} as="div" className="relative z-99 focus:outline-none" onClose={handleClose}>
            <div className="fixed inset-0 z-10 w-full h-screen overflow-y-auto bg-black/70">
                <div className="flex h-full items-center justify-center">
                    <DialogPanel
                        transition
                        className="w-3/4 space-y-4 border-2 border-green-500 rounded bg-zinc-900 text-zinc-200 p-3 md:p-12
                        duration-100 ease-in 
                                    data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <div className="max-h-90 md:max-h-auto overflow-y-auto scroll-y-auto px-1 md:px-0">
                            <div> Hello! Feel free to reach out via the following avenues:</div>
                            <div className="md:ml-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-1/2 gap-2 py-2">

                                    <ContactListing listingName="Email Me!"
                                        listingData="mailto:errantsquam@gmail.com"
                                        listingIcon="material-symbols:mail" />

                                    <ContactListing listingName="Bluesky"
                                        listingData="https://bsky.app/profile/errantsquam.heckingsne.cc"
                                        listingIcon="ri:bluesky-fill" />

                                    <ContactListing listingName="XHS / Rednote"
                                        listingData="https://www.xiaohongshu.com/user/profile/677689c50000000018014b73"
                                        listingIcon="simple-icons:xiaohongshu" />

                                    <ContactListing listingName="Instagram"
                                        listingData="https://www.instagram.com/errantsquam/"
                                        listingIcon="mdi:instagram" />
                                </div>



                            </div>
                            <div className="ml-2 italic text-white/50 block md:hidden">
                                NOTE: Most active via email or Bluesky.<br /><br />
                                You can also reach me by errantSquam@gmail.com. <br />

                            </div>

                            <div className="ml-2 italic text-white/50 hidden md:block">
                                NOTE: Most active via email or Bluesky.<br />
                                You can also reach me by errantSquam@gmail.com. <br />

                            </div>
                            <br />
                            <div>
                                <p><b> Hey there!&nbsp;</b><Icon inline icon="noto:snake" className="text-3xl text-green-500 inline animate-bounce" /><br /> Art is my side gig, but I'm actually a <Link to="/programming"><b>
                                    <u>software dev</u></b></Link> by trade and looking for work.<br /><br className="inline md:hidden" />
                                    If you need someone who's well-versed in frontend/GUIs, consider reaching out to me via email.<br /></p><br />
                                <p className="text-zinc-400">Found a bug? Leave a report here:</p>

                                <a href="https://github.com/errantSquam/webbed-site/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-400">
                                    <div className="flex flex-row items-center space-x-1 underline md:ml-4 align-middle">
                                        <Icon icon="mdi:github" />
                                        <p>GitHub Issues</p>
                                    </div>
                                </a>

                            </div>
                        </div>
                        <Button
                            className="flex items-center justify-center
                                        gap-2 rounded-md 
                            bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white focus:not-data-focus:outline-none 
                            data-focus:outline data-focus:outline-white data-hover:bg-gray-600 
                            data-open:bg-gray-700 cursor-pointer select-none"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </>
}

export const ErrorMessage = () => {
    const [gangnamSnake, setGangnamSnake] = useState(false)
    return <div className="flex flex-col items-center justify-center h-full text-green-500/70">
        <TypeAnimation
            sequence={[
                "          ",
                2000,
                "hmmmmm yes, there's nothing here.",
                500,
                "hmmmmm yes, there's nothing here. unless...?",
                () => setGangnamSnake(true)
            ]}
            speed={70}
            cursor={false}
            className="type"
            repeat={0}
        />
        <img src="https://res.cloudinary.com/dpybxskau/image/upload/gangnamsnake.webp"
            onError={(e) => e.target.src = "/assets/gangnamsnake.webp"} className={`transition duration-500 
        ${gangnamSnake ? "opacity-30" : "opacity-0"}`}
            style={{
                filter: "sepia(100%) saturate(300%) hue-rotate(65deg)" //kiwami

            }} />

    </div>
}
export const TagBlock = ({ tagData, tagsColorDict }) => {
    return <span className={"px-2 py-1 text-xs text-white rounded " + tagsColorDict[tagData.tagType]}>{tagData.fullName}</span>
}

export const GallerySelect = ({ onChange, styles, options, value }) => {
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
        placeholder="Type to search..."
        isMulti
    />
}

export const GalleryFilter = ({ title, onChange, styles, options, value }) => {
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


export const GalleryModal = ({ isOpen, handleClose, filename, jsonData }) => {


    const [isLoaded, setIsLoaded] = useState(false)

    const portfolioTagQuery = portfolioTagData()
    if (jsonData === undefined) {
        return <div />
    }

    function getPortfolioTagData() {
        return portfolioTagQuery.isSuccess ? portfolioTagQuery.data : {}
    }

    function filePath() {
        return filename + "." + jsonData.extension

    }

    function cloudinaryPath() {
        return `https://res.cloudinary.com/dpybxskau/image/upload/${filePath().replaceAll(" ", "_")}`
    }

    function addDefaultSrc(e) {
        e.target.src = "assets/pics/" + filePath()
    }


    let fullTags = jsonData.tags.map((tag) => {
        return Object.keys(getPortfolioTagData()).length !== 0 && getPortfolioTagData()[tag]
    })

    let descString = jsonData.description


    let artDesc = createElement('span',
        { dangerouslySetInnerHTML: { __html: descString } },
    );

    const CloseButton = () => {
        return <Button
            className="w-2/3 flex items-center justify-center
                            gap-2 rounded-md 
                            bg-gray-700 transition-100 hover:bg-gray-600 px-3 py-1.5 text-sm font-semibold text-white 
                            cursor-pointer select-none"
            onClick={handleClose}
        >
            Close
        </Button>
    }

    //console.log(isLoaded)

    const ImageWithSkeleton = ({ isMobile = true }) => {

        let objStyle = !isMobile ? (jsonData.isVertical ? { height: "90vh" } : { height: "75vh" }) : { width: "75vw" }

        return <div className="flex py-2">
            <div className="absolute z-10">
                {<img src={cloudinaryPath()}
                    onError={addDefaultSrc}
                    className={`object-scale-down rounded-lg
                        ${isLoaded ? `` : "opacity-50 blur-sm"}
                            `}
                    style={objStyle}
                    onLoad={() => setIsLoaded(true)}
                    fetchpriority="high"
                />}
            </div>
            {<div className={!isLoaded ? `bg-zinc-900` : ""}>
                <div className={!isLoaded ? `animate-pulse flex flex-row items-center justify-center 
                                            shadow-lg ring-2 rounded-lg ring-green-500 shadow-green-500`: ""}>
                    {!isLoaded && <div className="absolute z-10 text-green-500 font-bold font-pirulen flex flex-col">
                        <div>LOADING{jsonData.tags.includes("3d") && " 3D"}...</div>
                        {jsonData.tags.includes("3d") && <div className="text-xs">this may take some time...</div>}
                    </div>}

                    <Skeleton
                        variant="rectangular"
                        className={"" + !isLoaded ? " rounded-lg " : ""}
                        animation="wave"
                    >
                        <div
                            style={{
                                ...objStyle,
                                aspectRatio: jsonData.dimensions[0] / jsonData.dimensions[1],

                            }}>
                            <img src="favicon.ico" style={{ aspectRatio: jsonData.dimensions[0] / jsonData.dimensions[1], ...objStyle }} />
                        </div>
                    </Skeleton>
                </div>
            </div>
            }
        </div>
    }

    return <Dialog open={isOpen} as="div" className="relative z-100 focus:outline-none w-full" onClose={handleClose}>
        <div className="fixed inset-0 z-10 w-full h-screen overflow-y-auto bg-black/70">
            <div className="px-10 flex max-w-screen min-h-full items-center justify-center">
                <DialogPanel
                    transition
                    className="duration-50 ease-in 
                data-closed:transform-[scale(95%)] data-closed:opacity-0"
                >
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="flex flex-col lg:flex-row justify-center">
                            <div className={"flex items-center justify-center lg:hidden"}>
                                <ImageWithSkeleton isMobile={true} />
                            </div>
                            <div className="flex flex-col justify-between 
                        lg:py-10 
                        pr-2 lg:max-w-1/3"
                                onClick={handleClose}>
                                <div className="flex flex-col space-y-2 items-center lg:items-start"
                                    onClick={(e) => (e.stopPropagation())}>
                                    <div className="mt-2 text-sm/6 text-white/50">
                                        <div className="flex flex-row 
                                    items-center justify-center 
                                    lg:justify-start
                                    flex-wrap space-x-2 gap-y-2
                                    ">
                                            {fullTags.map((tag, index) =>
                                                (<TagBlock tagData={tag} tagsColorDict={tagsColorDict} key={index} />))}
                                        </div>
                                    </div>
                                    <p className="text-white text-sm"

                                    ><b>Description: </b>
                                        {descString !== "" ? artDesc : <i>None</i>}
                                    </p>
                                </div>
                                <div className="mt-4 w-full hidden lg:inline">
                                    <CloseButton />
                                </div>
                            </div>
                            <div className={" lg:flex items-center justify-center hidden"}>
                                <div className="max-h-screen py-4"><ImageWithSkeleton isMobile={false} /></div>
                            </div>

                            <div className="mt-4 w-full flex items-center justify-center lg:hidden">
                                <CloseButton />
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
}

export const GalleryImage = ({ filename, jsonData }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isOpen, setIsOpen] = useState(filename === searchParams.get("art"))
    const [isLoaded, setIsLoaded] = useState(false)

    let paramName = filename.split(" ").join("+")

    function handleOpen() {
        setIsOpen(true)
        let urlString = window.location.search
        urlString = handleUrlQuery(urlString, "art", paramName)
        history.pushState({}, "Gallery", urlString)
    }

    function handleClose() {
        setIsOpen(false)
        let newUrl = window.location.search.replace(`&art=${paramName}`, "")
        newUrl = newUrl.replace(`art=${paramName}`, "")

        history.pushState({}, "Gallery", newUrl)
        searchParams.delete("art")
        setSearchParams(searchParams)

    }

    function filePath() {
        return filename + "." + jsonData.extension

    }

    function cloudinaryPath() {
        return `https://res.cloudinary.com/dpybxskau/image/upload/${filePath().replaceAll(" ", "_")}`
    }

    function addDefaultSrc(e) {
        e.target.src = "assets/pics/" + filePath()
    }

    let objSize = `object-cover w-64 md:w-auto md:h-64`

    return <>
        <div className={`p-1 mx-1`}>
            <div className={`${isLoaded ? `transition border-2 border-green-400/0 hover:scale-105 
                            hover:border-green-400 hover:cursor-pointer` : "opacity-50"} 
                            absolute z-10 rounded-lg overflow-hidden`}>
                {<img src={cloudinaryPath()}
                    onError={addDefaultSrc}
                    style={{}}
                    className={`${objSize} 
                        ${!isLoaded && "blur-sm"}
                            `}
                    onClick={() => { isLoaded && handleOpen() }}
                    onLoad={() => setIsLoaded(true)}
                    fetchpriority="high"
                />}
            </div>
            {<div className={!isLoaded ? `bg-zinc-900` : ""}>
                <div className={!isLoaded ? `animate-pulse flex flex-row items-center justify-center 
                        shadow-lg ring-2 rounded-lg ring-green-500 shadow-green-500`: ""}>
                    {!isLoaded && <div className="absolute z-10 text-green-500 font-bold font-pirulen flex flex-col">
                        <div>LOADING{jsonData.tags.includes("3d") && " 3D"}...</div>
                        {jsonData.tags.includes("3d") && <div className="text-xs">this may take some time...</div>}
                    </div>}

                    <Skeleton
                        variant="rectangular"
                        className={!isLoaded ? "bg-zinc-900 rounded-lg " : "bg-zinc-900/0"}
                        animation="wave">
                        <div className={objSize}
                            style={{
                                aspectRatio: jsonData.dimensions[0] / jsonData.dimensions[1]
                            }}><img src="favicon.ico" style={{
                                aspectRatio: jsonData.dimensions[0] / jsonData.dimensions[1]
                            }} className={`${objSize}`} /></div>
                    </Skeleton>
                </div>
            </div>
            }


        </div>
        <GalleryModal isOpen={isOpen} handleClose={handleClose}
            filename={filename}
            jsonData={jsonData}
        />

    </>
}

export const HiddenModal = ({ filename, jsonData }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        setIsOpen(filename !== null)

    }, [])




    function handleClose() {
        let paramName = ""
        if (filename !== null) {
            paramName = filename.split(" ").join("+")
        }
        setIsOpen(false)
        searchParams.delete("art")
        setSearchParams(searchParams)

    }

    return filename !== null && <GalleryModal isOpen={isOpen}
        filename={filename}
        handleClose={handleClose} jsonData={jsonData} />

}
