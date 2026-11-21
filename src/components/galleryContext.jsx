import { createContext, useContext, useEffect } from "react"
import { useState } from "react"
import { portfolioData, portfolioTagData, groupTagData } from "../api/galleryAPI"
import { handlePageViaSearchParams } from "../api/galleryAPI"
import { handlePageFilters } from "../api/galleryAPI"
import { getFilteredArtByPriority } from "../stylesfunctions/artFilter"
import { useSearchParams } from "react-router-dom"
import { chickenLoading } from "../components/splashscreen"
import { writeTagsToParams } from "../api/galleryAPI"

export const GalleryContext = createContext()

export const GalleryProvider = ({ activePage = "Index", children }) => {

    const tabFilters = {
        "Index": { "include": [], "exclude": [] },
        "Other": { "include": [], "exclude": [] },
        "Illustration": {
            "include": [
                {
                    "value": "illust",
                    "label": "Illustration",
                    "tagType": "medium"
                }
            ],
            "exclude": [
                {
                    "value": "chibi",
                    "label": "Chibi",
                    "tagType": "scope"
                },
                {
                    "value": "charactersheet",
                    "label": "Character Sheet",
                    "tagType": "scope"
                },
                {
                    "value": "animated",
                    "label": "Animated",
                    "tagType": "medium"
                }
            ]
        },

        "Fantasy": {
            "include": [],
            "exclude": [
                {
                    "value": "mecha",
                    "label": "Mecha",
                    "tagType": "charatype"
                }
            ]
        },
        "Creatures": {
            "include": [
                {
                    "value": "creature",
                    "label": "Creature",
                    "tagType": "charatype"
                },
                {
                    "value": "illust",
                    "label": "Illustration",
                    "tagType": "medium"
                }
            ],
            "exclude": [
                {
                    "value": "human",
                    "label": "Human",
                    "tagType": "charatype"
                },
                {
                    "value": "fanart",
                    "label": "Fanart",
                    "tagType": "copyright"
                }
            ]
        },
        "Mecha": {
            "include": [
                {
                    "value": "mecha",
                    "label": "Mecha",
                    "tagType": "charatype"
                }
            ],
            "exclude": []
        }

    }
    const [searchParams, setSearchParams] = useSearchParams()

    const [selectedFilters, setSelectedFilters] = useState(
        tabFilters[activePage]
    )
    const [artList, setArtList] = useState([])
    const [hiddenArt, setHiddenArt] = useState(null)

    const numArtPerPage = 14

    const [isChickenLoading, setIsChickenLoading] = useState(true)
    const portfolioQuery = portfolioData()
    const portfolioTagQuery = portfolioTagData()
    const groupTagQuery = groupTagData()




    function handlePageNumber(page, doLoad = true, loadTime = 500) {
        let currPage = getCurrentPage()
        if (page == currPage && !doLoad) {
            return
        }

        let tempSearchParams = new URLSearchParams(window.location.search)

        setIsChickenLoading(true)
        setTimeout(() => {
            window.scrollTo(0, 0);
            console.log("Setting to... " + page)
            tempSearchParams.set("page", page)

            setSearchParams(tempSearchParams.toString())
        }, loadTime)
        chickenLoading(400, setIsChickenLoading)
    }


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
    function getCurrentPage() {
        return Number(new URLSearchParams(window.location.search).get("page"))
    }


    function getLastPage(artList = artList) {
        return Math.ceil(artList.length / numArtPerPage)
    }

    function getArtListPaginated() {
        let page = getCurrentPage()
        return getArtListByPage(page)
    }

    function getArtListByPage(page) {
        let startIndex = (page - 1) * numArtPerPage
        let endIndex = Math.min((page - 1) * numArtPerPage + numArtPerPage, artList.length)

        return artList.slice(startIndex, endIndex)
    }


    function getLatestPage(tempArtList = artList) {
        console.log("Getting latest page...")

        let page = getCurrentPage()
        let lastPage = getLastPage(tempArtList)
        console.log(page)
        console.log(lastPage)
        if (lastPage === 0) {
            return 1
        }
        if (page > lastPage) {
            //I have no idea if this calculation works but it currently works with my shitty test case
            handlePageNumber(lastPage, false)
            return lastPage
        }
        return page
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
        console.log(tempSelectedFilters)
        writeTagsToParams(tempSelectedFilters)
        let newArtList = getFilteredArtByPriority(getPortfolioData(), tempSelectedFilters)
        setSelectedFilters(tempSelectedFilters)
        setArtList(newArtList)
        getLatestPage(newArtList)

    }

    function updateFilters(newSelectedFilters) {
        let newArtList = getFilteredArtByPriority(getPortfolioData(), newSelectedFilters, activePage !== "Other")
        setSelectedFilters(newSelectedFilters)
        setArtList(newArtList)
        handlePageNumber(1, true)

    }

    useEffect(() => {
        updateFilters(tabFilters[activePage])

    }, [activePage])

    //Run when initialized!
    useEffect(() => {
        handlePageViaSearchParams();

        //this has to be run After fetching grouptagdata...
        if (portfolioTagQuery.isSuccess) {
            let tempSelectedFilters = handlePageFilters(getPortfolioTagData())
            if (activePage !== "Other") {
                tempSelectedFilters = tabFilters[activePage]
            }

            let tempArtList = getFilteredArtByPriority(getPortfolioData(), tempSelectedFilters, activePage !== "Other")

            let hiddenArt = searchParams.get("art")
            if (hiddenArt !== null) {
                let tempPageArtList = getArtListByPage(searchParams.get("page"), numArtPerPage)
                if (tempPageArtList.includes(hiddenArt)) {
                    hiddenArt = null
                }
            }
            setHiddenArt(hiddenArt)
            setSelectedFilters(tempSelectedFilters)
            setArtList(tempArtList)

            getLatestPage(tempArtList)

        }




    }, [portfolioQuery.isSuccess && portfolioTagQuery.isSuccess && groupTagQuery.isSuccess])


    return <GalleryContext.Provider value={{
        searchParams, setSearchParams,
        selectedFilters, setSelectedFilters,
        artList, setArtList,
        hiddenArt, setHiddenArt,
        numArtPerPage, isLoading,
        isChickenLoading, setIsChickenLoading,
        portfolioQuery, portfolioTagQuery,
        groupTagQuery,
        getCurrentPage, getArtListPaginated,
        getArtListByPage, getLatestPage,
        handlePageNumber,
        getLastPage, handleSelect,
        updateFilters, activePage

    }}>
        {children}
    </GalleryContext.Provider>
}

export const useGallery = () => useContext(GalleryContext);
