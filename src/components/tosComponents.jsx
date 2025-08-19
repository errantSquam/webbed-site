import React from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
export const LightHr = () => {
    return <hr className="my-4 border-zinc-500" />

}


export const Header = ({ children, icon = "", id = "" }) => {
    return <div id = {id} className="md:text-lg text-center md:text-start font-pirulen text-white mb-2 flex flex-row items-center space-x-2">
        {icon !== "" && <Icon icon = {icon} className = {`hidden md:inline`}/>}
        <div>{children}</div>
        </div>
}

const ToCListing = ({ children, id }) => {
    const handleScroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return <li onClick={() => { handleScroll(id) }} className="select-none cursor-pointer"><u>{children}</u></li>
}

export const TableOfContents = ({tocDict, children}) => {

    return <div>
        <Header icon="teenyicons:bookmark-solid">TABLE OF CONTENTS</Header>
        <ul className="list-decimal text-center md:text-start md:ml-15 md:text-lg font-jura font-bold">
            {Object.keys(tocDict).map((key, index) => {
                let value = tocDict[key]
                return <ToCListing id={value.id} key = {key + index}>{value.title}</ToCListing>
            })}
        </ul>
        {children}
    </div>
}
