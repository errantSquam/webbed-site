import { React, useState } from "react"
import Select from "react-select"
import "../stylesfunctions/typeStyle.css"
import { TypeAnimation } from "react-type-animation"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Link } from "react-router-dom"
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react"
import { Button } from "@headlessui/react"
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

    </div></Link>
}



export const CommissionsButton = () => {
    return <Link to="/commissions"><div className={`text-green-500 flex flex-row space-x-1 items-center justify-center font-jura font-bold
        bg-zinc-900 px-2 py-1 rounded-md cursor-pointer select-none transition hover:scale-105`}>
        <Icon icon="mdi:art" />
        <div>Order a Commission</div>
    </div></Link>
}


export const ContactButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setIsOpen(false)
    }

    return <>
        <div className={`text-green-500 flex flex-row space-x-1 items-center justify-center font-jura font-bold
        bg-zinc-900 px-2 py-1 rounded-md cursor-pointer select-none transition hover:scale-105`}
            onClick={() => setIsOpen(true)}>
            <Icon icon="material-symbols:mail" />
            <div>Contact Me / Socials</div>
        </div>

        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={handleClose}>
            <div className="fixed inset-0 z-10 w-full h-screen overflow-y-auto bg-black/70">
                <div className="flex h-full items-center justify-center">
                    <DialogPanel
                        transition
                        className="w-3/4 space-y-4 border-2 border-green-500 rounded bg-zinc-900 text-zinc-200 p-3 md:p-12
                        duration-100 ease-in 
                                    data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <div>
                            <div> Hello! Feel free to reach out via the following avenues:</div>
                            <div className="md:ml-4">
                                <div className="flex flex-row items-center space-x-1 align-middle">
                                    <Icon icon="material-symbols:mail" />
                                    <p>errantsquam@gmail.com</p>
                                </div>
                                <a href="https://bsky.app/profile/errantsquam.heckingsne.cc"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <div className="flex flex-row items-center space-x-1 underline align-middle">
                                        <Icon icon="ri:bluesky-fill" />
                                        <p>errantsquam.heckingsne.cc</p>
                                    </div>
                                </a>

                            </div>
                            <br/>
                            <div>
                                <p>Found a bug? Leave a report in the Issues tab:</p>

                                <a href="https://github.com/errantSquam/webbed-site/issues"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <div className="flex flex-row items-center space-x-1 underline md:ml-4 align-middle">
                                        <Icon icon="mdi:github" />
                                        <p>https://github.com/errantSquam/webbed-site/issues</p>
                                    </div>
                                </a>

                            </div>
                        </div>
                        <Button
                            className="flex items-center justify-center
                                        gap-2 rounded-md 
                            bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white 
                            shadow-inner shadow-white/10 focus:not-data-focus:outline-none 
                            data-focus:outline data-focus:outline-white data-hover:bg-gray-600 
                            data-open:bg-gray-700 cursor-pointer select-none"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </>
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
        <img src="https://res.cloudinary.com/dpybxskau/image/upload/gangnamsnake.webp"
            onError={(e) => e.target.src = "/assets/gangnamsnake.webp"} className={`transition duration-500 
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
