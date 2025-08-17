import React from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
export const LightHr = () => {
    return <hr className="my-4 border-zinc-500" />

}


export const Header = ({ children, icon = "" }) => {
    return <div className="md:text-lg text-center md:text-start font-pirulen text-white mb-2 flex flex-row items-center space-x-2">
        <Icon icon = {icon} className = {`hidden ${icon != "" && "md:inline"}`}/>
        <div>{children}</div>
        </div>
}
