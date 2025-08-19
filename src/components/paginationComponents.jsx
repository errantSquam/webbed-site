import { React, useState } from "react"
import { useEffect } from "react"
import "../stylesfunctions/typeStyle.css"
import { Icon } from "@iconify/react/dist/iconify.js"

export const PaginationArrow = ({ iconName, onClick, isActive, textType = "previous" }) => {
    return <div className={`flex flex-row items-center justify-center ${isActive ?
        "transition hover:scale-125 hover:text-lime-400 text-green-500 cursor-pointer" :
        "text-zinc-500"} gap-x-1 md:gap-x-2 rounded-lg py-1 md:py-2 px-1 md:px-2`}
        style={{ WebkitTransform: "translateZ(0px)" }}
        onClick={onClick}>
        {textType === "next" && <div className={`font-pirulen text-xl md:text-2xl`}>NEXT</div>}
        <div className={` flex flex-col items-center justify-center select-none`}
        >
            <Icon icon={iconName} className="text-2xl md:text-4xl" />
        </div>
        {textType === "previous" && <div className={`font-pirulen text-xl md:text-2xl`}>PREV</div>}
    </div>
}


export const PaginationNav = ({ isArrowActive, handlePage, handlePageNumber, pageDisplayCurrent, pageDisplayMax }) => {
    const [pageAtBottom, setAtBottom] = useState(false)
    const [currentPage, setCurrentPage] = useState(pageDisplayCurrent)


    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY + 250) >= document.body.offsetHeight) {
            setAtBottom(true)
        } else {
            setAtBottom(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    useEffect(() => {
        setCurrentPage(pageDisplayCurrent)
    }, [pageDisplayCurrent])

    const updatePage = (event) => {
        if (event !== undefined) {
            event.preventDefault();
        }
        let newVal = currentPage

        if (isNaN(newVal) || newVal === "") {
            newVal = pageDisplayCurrent
        }

        if (newVal < 1) {
            newVal = 1
        } else if (newVal > pageDisplayMax) {
            newVal = pageDisplayMax
        }
        newVal = Math.floor(newVal)

        if (newVal === currentPage) {
            return
        }
        setCurrentPage(newVal)
        handlePageNumber(newVal, true)
    }

    const inputWidth = "w-10"

    return <div className={`fixed bottom-0 w-full flex flex-row justify-between md:justify-around 
        items-center transition duration-300 ${pageAtBottom ? "opacity-100" : "opacity-50"} hover:opacity-100
        bg-black/90
        py-3 md:py-0 px-3 sm:px-5 md:px-10 z-50`}>
        <PaginationArrow
            iconName="fa7-regular:circle-left"
            isActive={isArrowActive("previous")}
            onClick={() => handlePage("previous")}
            textType="previous" />
        <div className="text-white/70 font-pirulen md:text-2xl md:absolute flex flex-row gap-x-1">
            <span className="hidden md:inline">PAGE </span>
            <form onSubmit={(e) => { updatePage(e) }}
                className="inline">
                <input
                    type="text"

                    value={currentPage}
                    onChange={(e) => {
                        let newval = e.target.value
                        setCurrentPage(newval)
                    }}
                    onBlur={() => { updatePage() }}

                    className={`${inputWidth} items-center text-center underline`}
                />
            </form>
            <div>/</div>
            <div className={`${inputWidth} text-center inline`}>{pageDisplayMax}</div>
        </div>
        <PaginationArrow
            iconName="fa7-regular:circle-right"
            isActive={isArrowActive("next")}
            onClick={() => handlePage("next")}
            textType="next" />
    </div>
}