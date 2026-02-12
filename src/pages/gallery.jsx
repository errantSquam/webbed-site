import { React, useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { createElement } from "react"
import { Skeleton } from "@mui/material"
import tagsColorDict from "../stylesfunctions/tagsColorDict"
import { selectStyles, selectStylesExclude } from "../stylesfunctions/selectStyles"
import { getFilteredArtByPriority } from "../stylesfunctions/artFilter"
import SplashScreen from "../components/splashscreen"
import { TagBlock, GalleryFilter } from "../components/galleryComponents"
import { TypeAnimation } from "react-type-animation"
import "../stylesfunctions/typeStyle.css"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useSearchParams } from "react-router-dom"
import { PaginationNav } from "../components/paginationComponents"

import { CommissionsButton, ErrorMessage } from "../components/galleryComponents"
import handleUrlQuery from "../stylesfunctions/handleUrlQuery"

import { convertTagToSelectLabel, handleFilterParams } from "../stylesfunctions/apiFilter"
import { chickenLoading } from "../components/splashscreen"

import { ContactButton } from "../components/galleryComponents"
import { useQuery } from '@tanstack/react-query'
import { TopNav } from "../components/navComponents"
import { portfolioData, portfolioTagData, groupTagData } from "../api/galleryAPI"

const GalleryModal = ({ isOpen, handleClose, filename, jsonData }) => {


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
                            bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white 
                            shadow-inner shadow-white/10 cursor-pointer select-none"
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

const GalleryImage = ({ filename, jsonData }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isOpen, setIsOpen] = useState(filename === searchParams.get("art"))
    const [isLoaded, setIsLoaded] = useState(false)

    let paramName = filename.split(" ").join("+")

    function handleOpen() {
        setIsOpen(true)
        let urlString = window.location.hash
        urlString = handleUrlQuery(urlString, "art", paramName)
        history.pushState({}, "Gallery", urlString)
    }

    function handleClose() {
        setIsOpen(false)
        let newUrl = window.location.hash.replace(`&art=${paramName}`, "")
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

const HiddenModal = ({ filename, jsonData }) => {
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


export default function Gallery() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [selectedFilters, setSelectedFilters] = useState(
        {
            include: [],
            exclude: []
        }
    )
    const [artList, setArtList] = useState([])
    const [hiddenArt, setHiddenArt] = useState(null)

    const numArtPerPage = 12

    const [isChickenLoading, setIsChickenLoading] = useState(true)
    const portfolioQuery = portfolioData()
    const portfolioTagQuery = portfolioTagData()
    const groupTagQuery = groupTagData()

    function isLoading() {
        return isChickenLoading || !(portfolioQuery.isSuccess && portfolioTagQuery.isSuccess && groupTagQuery.isSuccess)
    }

    function getPortfolioData() {
        return portfolioQuery.isSuccess ? portfolioQuery.data : {}
    }

    function getPortfolioTagData() {
        return portfolioTagQuery.isSuccess ? portfolioTagQuery.data : {}
    }

    function getGroupTagData() {

        if (!groupTagQuery.isSuccess || !portfolioTagQuery.isSuccess) {
            return []
        }

        let data = groupTagQuery.isSuccess ? groupTagQuery.data : {}

        let tempGroupTagList = Object.keys(data).map((tagType) => {
            return {
                label: tagType,
                options: data[tagType].map((tagName) => {
                    return convertTagToSelectLabel(tagName, getPortfolioTagData())
                })
            }
        })
        return tempGroupTagList
    }

    useEffect(() => {
        console.log("Fetching...")
        //console.log(portfolioQuery)
        //console.log(getPortfolioData())
        let tempSearchParams = searchParams
        let paramPage = tempSearchParams.get("page")
        if (paramPage === null || isNaN(paramPage)) {
            paramPage = 1

            setSearchParams({ page: 1 })
        }

        //this has to be run After fetching grouptagdata...
        if (portfolioTagQuery.isSuccess) {
            let tempSelectedFilters = ["include", "exclude"]
                .reduce((accumulator, filterType) => {
                    return (handleFilterParams(filterType, tempSearchParams, accumulator, getPortfolioTagData()))
                }, selectedFilters)


            new Array("include", "exclude").forEach((filterType) => {
                if (tempSelectedFilters[filterType] === null) {
                    return
                }
                if (tempSelectedFilters[filterType].length === 0) {
                    searchParams.delete(filterType)
                    setSearchParams(searchParams)
                }
            })

            let tempArtList = getFilteredArtByPriority(getPortfolioData(), tempSelectedFilters)

            let hiddenArt = tempSearchParams.get("art")
            if (hiddenArt !== null) {
                let tempPageArtList = getArtListByPage(tempArtList, paramPage)
                if (tempPageArtList.includes(hiddenArt)) {
                    hiddenArt = null
                }
            }

            setHiddenArt(hiddenArt)
            setSelectedFilters(tempSelectedFilters)
            setArtList(tempArtList)
        }

    }, [portfolioQuery.isSuccess && portfolioTagQuery.isSuccess && groupTagQuery.isSuccess])

    useEffect(() => {
        let currPage = getCurrentPage()
        if (currPage < 1 || isNaN(currPage)) {
            handlePageNumber(1)
        }


    }, [searchParams.get("page")])

    useEffect(() => {
        chickenLoading(500, setIsChickenLoading)
    }, [])



    function writeTagsToParams(selectedFilters) {

        let tempSelectedFilters = { ...selectedFilters }
        let includeFilters = tempSelectedFilters.include
        let excludeFilters = tempSelectedFilters.exclude


        function handleFilter(filter) {
            let tempValue = filter.value
            tempValue = tempValue.split(" ").join("+")
            return tempValue
        }

        includeFilters = includeFilters.map((filter) => {
            return handleFilter(filter)
        })

        excludeFilters = excludeFilters.map((filter) => {
            return handleFilter(filter)
        })

        includeFilters = includeFilters.join(",")
        excludeFilters = excludeFilters.join(",")

        let urlString = window.location.hash
        urlString = handleUrlQuery(urlString, "include", includeFilters)


        urlString = handleUrlQuery(urlString, "exclude", excludeFilters)



        history.pushState({}, "Gallery", urlString)

        if (includeFilters !== "") {
            searchParams.set("include", includeFilters)
        }
        if (excludeFilters !== "") {
            searchParams.set("exclude", excludeFilters)
        }


    }

    function handleSelect(options, currKey, oppKey) {
        let tempSelectedFilters = { ...selectedFilters }
        tempSelectedFilters[currKey] = options

        let range = [...Array(options.length).keys()]

        range.forEach((index) => {
            let option = options[index]

            //better way of array includes...because we can't have nice things
            let oppContains = tempSelectedFilters[oppKey].some(oppOption => {
                return JSON.stringify(option) === JSON.stringify(oppOption);
            });

            if (oppContains) {
                tempSelectedFilters[oppKey] = tempSelectedFilters[oppKey].filter((i) => JSON.stringify(i) !== JSON.stringify(option))
            }
        })

        writeTagsToParams(tempSelectedFilters)
        let newArtList = getFilteredArtByPriority(getPortfolioData(), tempSelectedFilters)

        setSelectedFilters(tempSelectedFilters)
        setArtList(newArtList)
        getLatestPage(newArtList)

    }


    function getArtListByPage(artList, page) {
        let startIndex = (page - 1) * numArtPerPage
        let endIndex = Math.min((page - 1) * numArtPerPage + numArtPerPage, artList.length)

        return artList.slice(startIndex, endIndex)
    }
    function getArtListPaginated() {
        let page = getCurrentPage()
        return getArtListByPage(artList, page)
    }

    function isArrowActive(direction) {
        let page = getCurrentPage()
        if (direction === "previous") {
            if (page === 1) {
                return false
            }
        } else {
            if ((page - 1) * numArtPerPage + numArtPerPage > artList.length - 1) {
                return false
            }
        }

        return true
    }

    function handlePage(direction) {
        let page = getCurrentPage()
        if (direction === "previous" && isArrowActive("previous")) {
            handlePageNumber(page - 1)
        }

        else if (direction === "next" && isArrowActive("next")) {
            handlePageNumber(page + 1)
        }

    }

    function handlePageNumber(page, doLoad = true) {


        let currPage = getCurrentPage()
        if (page == currPage) {
            return
        }

        let tempSearchParams = searchParams

        setIsChickenLoading(true)
        setTimeout(() => {
            window.scrollTo(0, 0);
            tempSearchParams.set("page", page)

            setSearchParams(tempSearchParams.toString())
        }, 300)


        chickenLoading(400, setIsChickenLoading)



    }

    function getLatestPage(artList) {
        let page = getCurrentPage()
        if (page > getLastPage(artList)) {

            //I have no idea if this calculation works but it currently works with my shitty test case
            handlePageNumber(getLastPage(artList), false)
        }
    }

    function getCurrentPage() {
        return Number(searchParams.get("page"))
    }

    function getLastPage(artList) {

        return Math.ceil(artList.length / numArtPerPage)
    }




    return (
        <div className="min-h-screen bg-zinc-800 overflow-x-hidden pb-15" >
            {<SplashScreen isLoading={isLoading()} />}
            <div>
                <PaginationNav
                    isArrowActive={isArrowActive}
                    handlePage={handlePage}
                    handlePageNumber={handlePageNumber}
                    pageDisplayCurrent={getCurrentPage()}
                    pageDisplayMax={getLastPage(artList)} />
            </div>
            <div className=" md:px-10 flex flex-col items-center text-center">
                <div className="mb-2 ">
                    <TopNav setHome={() => handlePageNumber(1)}
                        color="bg-orange-900"
                        accentColor="border-green-500">
                        <Icon icon="clarity:eye-solid" className="hidden md:flex text-2xl text-green-300/70" />
                        <span>
                            Gallery
                        </span>
                        <Icon icon="clarity:eye-solid" className="hidden md:flex text-2xl text-green-300/70 -ml-0.5" />
                    </TopNav>

                </div>

                <div className="flex flex-row flex-wrap lg:flex-nowrap w-4/5 gap-x-4 mb-2 z-50">
                    <GalleryFilter
                        title="#INCLUDES"
                        onChange={(options) => { handleSelect(options, "include", "exclude") }}
                        styles={selectStyles}
                        options={getGroupTagData()}
                        value={selectedFilters.include}
                    />
                    <GalleryFilter
                        title="#EXCLUDES"
                        onChange={(options) => { handleSelect(options, "exclude", "include") }}
                        styles={selectStylesExclude()}
                        options={getGroupTagData()}
                        value={selectedFilters.exclude}
                    />
                </div>

                <div className="mt-2">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <ContactButton />
                        <CommissionsButton />
                    </div>
                </div>




                <div className="flex flex-col md:flex-row justify-center items-center 
                md:flex-wrap w-5/6 md:w-auto md:px-10 py-2 gap-y-2"
                    key={selectedFilters}>
                    {getArtListPaginated().length === 0 &&
                        <ErrorMessage />}
                    {
                        getArtListPaginated().map((filename) => {
                            return <div className="" key={filename}>
                                <GalleryImage filename={filename}
                                    jsonData={getPortfolioData()[filename]} />
                            </div>

                        })
                    }
                </div>
                <HiddenModal
                    key={hiddenArt}
                    filename={hiddenArt} jsonData={getPortfolioData()[hiddenArt]} tagData={getPortfolioTagData()} />

            </div>
        </div>

    )

}
