import { React, useState } from "react"
import { useEffect } from "react"
import SplashScreen from "../components/splashscreen"
import "../stylesfunctions/typeStyle.css"
import { Icon } from "@iconify/react/dist/iconify.js"
import { PaginationNav } from "../components/paginationComponents"

import { CommissionsButton, ErrorMessage } from "../components/galleryComponents"
import { chickenLoading } from "../components/splashscreen"

import { ContactButton } from "../components/galleryComponents"
import { GalleryNav, HomelessTopNav, TopNav } from "../components/navComponents"

import { GalleryImage, GalleryModal, HiddenModal } from "../components/galleryComponents"

import { useContext, createContext } from "react"
import { GalleryContext, useGallery } from "../components/galleryContext"
import { Link } from "react-router-dom"

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
        handlePageNumber, handleSelect,
        updateFilters, activePage

    } = useGallery()

    function getPortfolioData() {
        return portfolioQuery.isSuccess ? portfolioQuery.data : {}
    }

    function getPortfolioTagData() {
        return portfolioTagQuery.isSuccess ? portfolioTagQuery.data : {}
    }



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
                    <GalleryNav activePage={activePage} />

                </div>




                <div className="-mx-10 mt-2 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <ContactButton />
                    <CommissionsButton />
                </div>



                <div className="flex flex-col md:flex-row justify-center items-center 
                md:flex-wrap w-5/6 md:min-w-full md:px-5 py-2 gap-y-2"
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

                <div className="flex md:hidden flex flex-row gap-x-5 items-center text-white justify-center 
                text-3xl py-4
                bg-gradient-to-t from-black to-black-0 w-full">
                    <span className="text-xl"> SOCIALS:</span>
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

                <HiddenModal
                    key={hiddenArt}
                    filename={hiddenArt} jsonData={getPortfolioData()[hiddenArt]} tagData={getPortfolioTagData()} />

            </div>
        </div >

    )

}
