
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useState } from "react"
export const TopNav = ({ setHome, children, color, accentColor }) => {
    const [isMenuOpen, setMenuOpen] = useState(false)


    return <div className="w-screen">
        {isMenuOpen && <div className="fixed w-screen min-h-screen bg-black/40 z-59"
            onClick={() => setMenuOpen(false)} />}
        {<div
            style={!isMenuOpen ? { pointerEvents: "none" } : {}}
        >
            <div className={`
            pt-15
            fixed bg-zinc-900 text-zinc-300 py-2 w-full 
                        border-b-2 md:border-b-0 md:border-r-2 ${accentColor}
                        md:w-1/5 
                        md:h-screen absolute z-60 select-none 
                        transition duration-0 md:duration-100 ${isMenuOpen ? "opacity-100" : `opacity-0 translate-x-0
                        md:translate-y-0 md:-translate-x-full`}`}>
                <div className="flex flex-col items-start text-start ml-8 gap-y-2 text-lg">
                    <Link to="/gallery"><div className="hover:text-zinc-100 cursor-pointer">Gallery</div></Link>
                    <Link to="/programming"><div className="hover:text-zinc-100 cursor-pointer">Programming</div></Link>
                    <Link to="/commissions"><div className="hover:text-zinc-100 cursor-pointer">Commissions</div></Link>

                </div>
            </div>

        </div>
        }
        <div className={`${isMenuOpen ? "fixed" : "sticky"} py-2 w-screen ${color} z-70`}>

            <div className="flex flex-row items-center">

                <div className="flex flex-row items-center justify-center select-none w-full mt-0.5">
                    <div className="text-2xl font-bold text-zinc-200 font-pirulen flex flex-row items-center gap-x-2
                    cursor-pointer select-none"
                        onClick={setHome}>
                        {children}

                    </div>
                </div>
                <div className="absolute ml-5 text-zinc-200 text-2xl 
                        flex flex-row gap-x-5"
                >
                    <div className="z-20">
                        <Icon icon={isMenuOpen ? "maki:cross" : "mdi:hamburger-menu"}
                            className={`select-none cursor-pointer ${isMenuOpen && "text-white"} hover:text-white`}
                            onClick={() => setMenuOpen(!isMenuOpen)} />
                    </div>
                    <Link to="/gallery"><Icon icon="ic:sharp-home"
                        className="hidden md:flex select-none cursor-pointer hover:text-white" /></Link>
                </div>
                <div className="absolute text-zinc-200 text-2xl 
                         right-0 mr-5"
                >
                    <div className="hidden md:flex flex flex-row gap-x-5">
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
                    </div>
                    <div className="flex md:hidden">
                        <Link to="/"><Icon icon="ic:sharp-home"
                            className="select-none cursor-pointer" /></Link>
                    </div>
                </div>

            </div>
        </div>

    </div>
}
