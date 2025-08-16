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
import { TagBlock, GalleryFilter } from "../components/galleryComponents"
import { TypeAnimation } from "react-type-animation"
import "../stylesfunctions/typeStyle.css"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useSearchParams } from "react-router-dom"
import { PaginationNav } from "../components/paginationComponents"



const ErrorMessage = () => {
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
        <img src="assets/gangnamsnake.webp" className={`transition duration-500 
        ${gangnamSnake ? "opacity-30" : "opacity-0"}`}
            style={{
                filter: "sepia(100%) saturate(300%) hue-rotate(65deg)" //kiwami

            }} />

    </div>
}
function handleUrlQuery(urlString, paramName, data) {
    let paramString = `${paramName}=`
    if (data === "") {
        urlString = urlString.replace(new RegExp(`&${paramName}=([^&]*)`), ``)
        urlString = urlString.replace(new RegExp(`${paramName}=([^&]*)`), ``)

    } else if (urlString.includes(paramString)) {
        urlString = urlString.replace(new RegExp(`&${paramName}=([^&]*)`), `&${paramName}=${data}`)
        urlString = urlString.replace(new RegExp(`${paramName}=([^&]*)`), `${paramName}=${data}`)

    } else {
        urlString += "&" + paramString + data
    }
    return urlString
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

    const numArtPerPage = 20

    const convertTagToSelectLabel = (tagName, portfolioData) => {
        return {
            value: tagName,
            label: portfolioData[tagName].fullName,
            "tagType": portfolioData[tagName].tagType
        }
    }

    useEffect(() => {
        let tempSearchParams = searchParams
        let paramPage = tempSearchParams.get("page")
        if (paramPage === null || isNaN(paramPage)) {
            tempSearchParams.page = 1

            setSearchParams({ page: 1 })
        }


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
                                return convertTagToSelectLabel(tagName, portfolioTagData)
                            })
                        }
                    })
                    setGroupedTaglist(tempGroupTagList)


                    //handle the freakin search params. may refactor this out later...?
                    let paramIncludes = tempSearchParams.get("include")
                    let paramExcludes = tempSearchParams.get("exclude")

                    let tempSelectedFilters = selectedFilters

                    if (paramIncludes !== null) {
                        paramIncludes = paramIncludes.split(",")

                        tempSelectedFilters.include = paramIncludes.map((filterName) => {
                            try {
                                return convertTagToSelectLabel(filterName, portfolioTagData)
                            } catch {

                            }
                        }).filter((filterName) => {
                            return filterName !== undefined
                        })

                        if (tempSelectedFilters.include.length === 0) {
                            searchParams.delete('include')
                            setSearchParams(searchParams)
                        }
                    }
                    if (paramExcludes !== null) {
                        paramExcludes = paramExcludes.split(",")

                        tempSelectedFilters.exclude = paramExcludes.map((filterName) => {
                            return convertTagToSelectLabel(filterName, portfolioTagData)
                        })

                    }



                    //then push it into selected filters! todo.
                    setSelectedFilters(tempSelectedFilters)

                    let tempArtList = getFilteredArtByPriority(portfolioData, tempSelectedFilters)
                    setArtList(tempArtList)





                }).then(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 2000)
                })

            })

        })


    }, [])

    useEffect(() => {
        let currPage = getCurrentPage()
        if (currPage < 1 || isNaN(currPage)) {
            handlePageNumber(1)
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 500)

    }, [searchParams.get("page")])


    const GalleryImage = ({ filename }) => {
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
            <div className=" p-1 ">
                {!isLoaded &&
                    <div className="bg-zinc-900 ">
                        <div className="animate-pulse flex flex-row items-center justify-center shadow-lg ring-2 rounded-lg ring-green-500 shadow-green-500">
                            <div className="absolute z-10 text-green-500 font-bold font-pirulen flex flex-col">
                                <div>LOADING{portfolioJson[filename].tags.includes("3d") && " 3D"}...</div>
                                {portfolioJson[filename].tags.includes("3d") && <div className="text-xs">this may take some time...</div>}
                            </div>

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
                                            <div className="mt-2 text-sm/6 text-white/50">
                                                <div className="flex flex-row 
                                                items-center justify-center 
                                                md:justify-start
                                                flex-wrap space-x-2 gap-y-2
                                                ">
                                                    {fullTags.map((tag, index) => 
                                                        (<TagBlock tagData={tag} tagsColorDict={tagsColorDict} key={index} />))}
                                                </div>
                                            </div>
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
                                        data-open:bg-gray-700 cursor-pointer select-none"
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

        /*function handleOpen() {
            setIsOpen(true)
            history.pushState({}, "Gallery", `${window.location.hash}&art=${paramName}`)
        }*/

    }

    function handleSelect(options, currKey, oppKey) {
        let tempSelectedFilters = { ...selectedFilters }
        tempSelectedFilters[currKey] = options

        let range = [...Array(options.length).keys()]

        range.forEach((index) => {
            let option = options[index]
            if (tempSelectedFilters[oppKey].includes(option)) {
                tempSelectedFilters[oppKey] = tempSelectedFilters[oppKey].filter((i) => i !== option)
            }
        })

        writeTagsToParams(tempSelectedFilters)



        let newArtList = getFilteredArtByPriority(portfolioJson, tempSelectedFilters)

        setSelectedFilters(tempSelectedFilters)
        setArtList(newArtList)
        getLatestPage(newArtList)

    }


    function getArtListByPage(page) {
        let startIndex = (page - 1) * numArtPerPage
        let endIndex = Math.min((page - 1) * numArtPerPage + numArtPerPage, artList.length)

        return artList.slice(startIndex, endIndex)
    }
    function getArtListPaginated() {
        let page = getCurrentPage()
        return getArtListByPage(page)
    }

    function isArrowActive(direction) {
        let page = getCurrentPage()
        if (direction === "previous") {
            if (page === 1) {
                return false
            }
        } else {
            if ((page - 1) * numArtPerPage + numArtPerPage >= artList.length - 1) {
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
        if (doLoad) {
            setIsLoading(true)
        }

        setTimeout(() => {
            window.scrollTo(0, 0);
            tempSearchParams.set("page", page)

            setSearchParams(tempSearchParams.toString())
        }, 300)

        setTimeout(() => {
            setIsLoading(false)
        }, 600)
    }

    function getLatestPage(artList) {
        let page = getCurrentPage()
        if ((page - 1) * numArtPerPage > artList.length) {

            //I have no idea if this calculation works but it currently works with my shitty test case
            handlePageNumber(getLastPage(artList), false)
        }
    }

    function getCurrentPage() {
        return Number(searchParams.get("page"))
    }

    function getLastPage(artList) {
        return Math.floor(artList.length / numArtPerPage) + 1
    }




    return (
        <div className="min-h-screen bg-zinc-800 overflow-x-hidden pb-15" >
            {<SplashScreen isLoading={isLoading} />}
            <div>
                <PaginationNav
                    isArrowActive={isArrowActive}
                    handlePage={handlePage}
                    handlePageNumber={handlePageNumber}
                    pageDisplayCurrent={getCurrentPage()}
                    pageDisplayMax={getLastPage(artList)} />
            </div>
            <div className=" md:px-10 flex flex-col items-center text-center">
                <div className="py-1 w-screen bg-orange-900 mb-2 flex flex-row items-center justify-center cursor-pointer select-none"
                    onClick={() => handlePageNumber(1)}>
                    <div className="text-2xl font-bold text-orange-100 font-pirulen flex flex-row items-center gap-x-2">
                        <Icon icon="clarity:eye-solid" className="text-2xl text-green-300/70" />
                        <span>
                            Gallery
                        </span>
                        <Icon icon="clarity:eye-solid" className="text-2xl text-green-300/70 -ml-0.5" />

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
                <Link to="/"><div className="text-green-400 mt-2 flex flex-row items-center space-x-2">
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


                <div className="flex flex-row justify-evenly flex-wrap w-4/5 px-5 py-2 gap-y-2"
                    key={selectedFilters}>
                    {getArtListPaginated().length === 0 &&
                        <ErrorMessage />}
                    {
                        getArtListPaginated().map((filename) => {
                            return <div className="" key={filename}>
                                <GalleryImage filename={filename} />
                            </div>

                        })
                    }
                </div>
            </div>
        </div>

    )

}

/*
    const CURSOR_CLASS_NAME = 'type';

[
                                "?",
                                (el) => el.classList.remove(CURSOR_CLASS_NAME),
                                10000,
                                (el) => el.classList.add(CURSOR_CLASS_NAME),
                                " :)",
                                (el) => el.classList.remove(CURSOR_CLASS_NAME),
                                5000,
                                (el) => el.classList.add(CURSOR_CLASS_NAME),
                                "?",
                                (el) => el.classList.remove(CURSOR_CLASS_NAME),
                                10000,
                                (el) => el.classList.add(CURSOR_CLASS_NAME),
                                ". watch snek dance.",
                                (el) => el.classList.remove(CURSOR_CLASS_NAME),
                                2000,
                                (el) => el.classList.add(CURSOR_CLASS_NAME),
                                "?",
                                (el) => el.classList.remove(CURSOR_CLASS_NAME),
                                10000,
                                (el) => el.classList.add(CURSOR_CLASS_NAME),
                                ", or maybe not. stay and enjoy the art.",
                                (el) => el.classList.remove(CURSOR_CLASS_NAME),
                                10000,
                                (el) => el.classList.add(CURSOR_CLASS_NAME),
                                "?",
                                (el) => el.classList.remove(CURSOR_CLASS_NAME),
                                10000
                            ]*/