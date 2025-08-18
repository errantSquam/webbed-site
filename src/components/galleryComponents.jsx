import { React, useState } from "react"
import Select from "react-select"
import "../stylesfunctions/typeStyle.css"
import { TypeAnimation } from "react-type-animation"
import { Icon } from "@mui/material"
import { Link } from "react-router-dom"
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

</div></Link>}



export const CommissionsButton =() => {
    return <Link to = "/commissions"><div className = {`text-green-500 flex flex-row space-x-1 items-center justify-center font-jura font-bold
        bg-zinc-900 px-2 py-1 rounded-md cursor-pointer select-none transition hover:scale-105`}>
            <Icon icon = "mdi:art"/>
            <div>Commissions</div>
        </div></Link>
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
        <img src="assets/gangnamsnake.webp" className={`transition duration-500 
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
