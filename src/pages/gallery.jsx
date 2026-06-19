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

import { convertTagToSelectLabel } from "../stylesfunctions/apiFilter"
import { chickenLoading } from "../components/splashscreen"

import { ContactButton } from "../components/galleryComponents"
import { useQuery } from '@tanstack/react-query'
import { TopNav } from "../components/navComponents"
import {
    portfolioData, portfolioTagData, groupTagData, handlePageViaSearchParams,
    handlePageFilters, writeTagsToParams
} from "../api/galleryAPI"

import { GalleryImage, GalleryModal, HiddenModal } from "../components/galleryComponents"

import { useContext, createContext } from "react"
import { GalleryContext, useGallery } from "../components/galleryContext"

const PaginationHelper = () => {

    const {

        selectedFilters, setSelectedFilters,
        artList, setArtList,
        numArtPerPage, isLoading,
        getCurrentPage, getLatestPage,
        handlePageNumber, getLastPage

    } = useGallery()



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




    return <PaginationNav
        isArrowActive={isArrowActive}
        handlePage={handlePage}
        handlePageNumber={handlePageNumber}
        pageDisplayCurrent={getCurrentPage()}
        pageDisplayMax={getLastPage(artList)} />
}



export default function Gallery() {

    const {
        searchParams,
        selectedFilters,
        hiddenArt,
        numArtPerPage, isLoading,
        setIsChickenLoading,
        portfolioQuery, portfolioTagQuery,
        groupTagQuery,
        getCurrentPage, getArtListPaginated,
        handlePageNumber, handleSelect

    } = useGallery()

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

    const [isClosed, setClosed] = useState(() => {
        const storageClosed = localStorage.getItem('popup_closed');
        return storageClosed ? storageClosed : 'false';
    }
    );


    useEffect(() => {
        let currPage = getCurrentPage()
        if (currPage < 1 || isNaN(currPage)) {
            handlePageNumber(1)
        }


    }, [searchParams.get("page")])

    useEffect(() => {
        chickenLoading(500, setIsChickenLoading)
    }, [])







    return (
        <div className="min-h-screen bg-zinc-800 overflow-x-hidden pb-15" >
            {<SplashScreen isLoading={isLoading()} />}
            <div>
                <PaginationHelper />
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




                <div className="-mx-10 mt-2 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <ContactButton />
                    <CommissionsButton />
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
        </div >

    )

}
