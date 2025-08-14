import { React, useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Select from "react-select"
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const tagsColorDict = {
    "oc": "bg-amber-600",
    "bg": "bg-purple-400",
    "medium": "bg-blue-400",
    "charatype": "bg-fuchsia-400",
    "copyright": "bg-indigo-400",
    "scope": "bg-red-400",
    "species": "bg-teal-400",
    "source": "bg-green-400",
    "misc": "bg-slate-400"
}

const selectStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'black',
        borderColor: 'var(--color-zinc-500)',
        color:"white"

    }),
    menu: (menuStyles, state) => ({
        ...menuStyles,
        backgroundColor: state.isFocused ? 'var(--color-zinc-800)' : 'black',

    }),

    input: (inputStyles, state) => ({
        ...inputStyles,
        backgroundColor: 'black',
        color: "white"
    }),
    multiValue: (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.tagType]})`.replace("bg", "color")
        return {
            ...styles,
            backgroundColor: colorvar,
            color:"white"
        }
    },
    multiValueLabel: (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.tagType]})`.replace("bg", "color")
        return {
            ...styles,
            backgroundColor: colorvar,
            color:"white"
        }
    },
    option: (styles, { data }) => {
        

        return {
            ...styles,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)"
            
        }
    },
    groupHeading: (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.label]})`.replace("bg", "color")
        return {
            ...styles,
            color: "white"
        }
    },
    group: (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.label]})`.replace("bg", "color")
        return {
            ...styles,
            backgroundColor: colorvar,
            color: "white",
            paddingBottom: 0
        }
    },

}

const selectStylesExclude = () => {
    let excludeStyles = {...selectStyles}

    let bgColor = `var(--color-red-900)`
    let textColor = `white`
    excludeStyles.multiValueLabel = (styles, { data }) => {
    let colorvar = `var(--${tagsColorDict[data.tagType]})`.replace("bg", "color")
        return {
            ...styles,
            borderStyle: "hidden",
            borderColor: colorvar,
            borderWidth: "3px",
            borderLeftStyle: "solid",
            backgroundColor: bgColor,
            color:textColor
        }
    }

    excludeStyles.multiValue = (styles, { data }) => {
        let colorvar = `var(--${tagsColorDict[data.tagType]})`.replace("bg", "color")
            return {
                ...styles,
                borderStyle: "solid",
                borderColor: colorvar,
                borderWidth: "3px",
                borderLeftStyle: "hidden",
                backgroundColor: bgColor,
                color:textColor
            }
        }


    return excludeStyles
}

export default function Gallery() {

    const [portfolioJson, setPortfolioJson] = useState({})
    const [portfolioTags, setPortfolioTags] = useState({})
    const [groupedTaglist, setGroupedTaglist] = useState([])
    const [selectedFilters, setSelectedFilters] = useState(
        {
            include: [],
            exclude: []
        }
    )


    const numGalleryCols = 3


    useEffect(() => {
        fetch('assets/portfolio.json').then((res) => res.json()).then((data) => {
            setPortfolioJson(data)

        })
        fetch('assets/portfoliotags.json').then((res) => res.json()).then((data) => {
            setPortfolioTags(data)
            let tempTagList = {}

            for (let i = 0; i < Object.keys(data).length; i++) {
                let tagName = Object.keys(data)[i]
                let tagtype = data[tagName].tagType
                if (tempTagList[tagtype] === undefined) {
                    tempTagList[tagtype] = [tagName]
                } else {
                    tempTagList[tagtype].push(tagName)
                }
            }

            let tempGroupTagList = Object.keys(tempTagList).map((tagType) => {
                return {
                    label: tagType,
                    options: tempTagList[tagType].map((tagName) => {
                        return {
                            value: tagName,
                            label: data[tagName].fullName,
                            "tagType": tagType
                        }
                    })
                }
            })
            setGroupedTaglist(tempGroupTagList)


        })

    }, [])

    let jsonRange = [...Array(Math.floor(Object.keys(portfolioJson).length / numGalleryCols)).keys()]

    const TagBlock = ({ tagData }) => {
        return <span className={"px-2 py-1 text-xs text-white rounded " + tagsColorDict[tagData.tagType]}>{tagData.fullName}</span>
    }

    const GalleryImage = ({ filename }) => {
        let [isOpen, setIsOpen] = useState(false)

        function open() {
            setIsOpen(true)
        }

        function close() {
            setIsOpen(false)
        }

        function filePath() {
            return filename + "." + portfolioJson[filename].extension

        }

        function fileThumb() {
            return filePath()
        }

        let fullTags = portfolioJson[filename].tags.map((tag) => {
            return Object.keys(portfolioTags).length !== 0 && portfolioTags[tag]
        })

        let artDesc = portfolioJson[filename].description



        return <>
            <div className=" p-1 flex flex-row">
                <img src={"assets/pics/" + fileThumb()}
                    className={"object-cover h-64 rounded-lg"}
                    key={filename}
                    onClick={() => setIsOpen(true)} />

            </div>



            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
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
                                            <p className="mt-2 text-sm/6 text-white/50">
                                                <div className="flex flex-row 
                                                items-center justify-center 
                                                md:justify-start
                                                flex-wrap space-x-2 gap-y-2
                                                ">
                                                    {fullTags.map((tag) => (<TagBlock tagData={tag} />))}
                                                </div>
                                            </p>
                                            <p className="text-white text-sm"><b>Description: </b>
                                                {artDesc !== "" ? artDesc : <i>None</i>}
                                            </p>




                                        </div>
                                        <div className="mt-4 w-full hidden md:inline">
                                            <Button
                                                className="w-2/3 flex items-center justify-center
                                                    gap-2 rounded-md 
                                        bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white 
                                        shadow-inner shadow-white/10 focus:not-data-focus:outline-none 
                                        data-focus:outline data-focus:outline-white data-hover:bg-gray-600 
                                        data-open:bg-gray-700"
                                                onClick={close}
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
                                            onClick={close}
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

    const formatGroupLabel = (data) => (
        <div>
            <span>{data.label}</span>
        </div>
    );

    const getFilteredArtIncludes = () => {
        if (selectedFilters.include.length === 0) {
            return Object.keys(portfolioJson)
        }

        return Object.keys(portfolioJson).filter((filename) => {

            return selectedFilters.include.every((tag) => {
                return portfolioJson[filename].tags.includes(tag.value)
            })
        })
    }
    const getFilteredArt = () => {
        let includedArt = getFilteredArtIncludes()
        if (selectedFilters.exclude.length === 0) {
            return includedArt
        }

        return includedArt.filter((filename) => {

            return selectedFilters.exclude.every((tag) => {
                return !portfolioJson[filename].tags.includes(tag.value)
            })
        })

    }

    const getFilteredArtByDate = () => {
        return getFilteredArt().toSorted((a, b) => portfolioJson[b].date - portfolioJson[a].date)
    }

    const getFilteredArtByPriority = () => {
        return getFilteredArtByDate().toSorted((a, b) => {
            let artArray = [portfolioJson[a], portfolioJson[b]]
            let compareArray = [0, 0]

            for (let i = 0; i < 2; i++) {
                if (artArray[i].tags.includes("complexbg")) {
                    compareArray[i] += 1
                } else if (artArray[i].tags.includes("simplebg")) {
                    compareArray[i] += 0.5
                }
                if (artArray[i].tags.includes("mecha")) {
                    compareArray[i] += 3
                }
                if (artArray[i].tags.includes("fullbody")) {
                    compareArray[i] += 2
                } else if (artArray[i].tags.includes("halfbody")) {
                    compareArray[i] += 1
                }
                if (artArray[i].tags.includes("animated")) {
                    compareArray[i] += 2
                }
                if (artArray[i].tags.includes("wings")) {
                    compareArray[i] += 1
                }
                if (artArray[i].tags.includes("oc")) {
                    compareArray[i] += 1
                } else if (artArray[i].tags.includes("fanart")) {
                    compareArray[i] -= 1
                }

                if (artArray[i].tags.includes("charactersheet")) {
                    compareArray[i] += 1
                }
            }

            return compareArray[1] - compareArray[0]
        })
    }

    return (
        <div className="min-h-screen bg-zinc-800">
            <div className=" md:px-10 flex flex-col items-center text-center">
                <div className="py-1 w-screen bg-orange-900 mb-2">
                    <h1 className="text-2xl font-bold text-orange-100 font-pirulen">Gallery</h1>
                </div>

                <div className="flex flex-row flex-wrap lg:flex-nowrap w-4/5 gap-x-4">
                    <div className="flex flex-col w-full">
                        <div className="text-green-400 font-pirulen">INCLUDES</div>
                        <div className=" text-left text-sm">
                            <Select
                                onChange={(options) => {
                                    let tempSelectedFilters = { ...selectedFilters }
                                    tempSelectedFilters.include = options
                                    setSelectedFilters(tempSelectedFilters)
                                }}
                                styles={selectStyles}

                                components={{ IndicatorSeparator: () => null }}

                                options={groupedTaglist}
                                formatGroupLabel={formatGroupLabel} key={groupedTaglist}


                                placeholder="Tag search..."
                                isMulti
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="text-green-400 font-pirulen">EXCLUDES</div>
                        <div className=" text-left text-sm">
                            <Select
                                onChange={(options) => {
                                    let tempSelectedFilters = { ...selectedFilters }
                                    tempSelectedFilters.exclude = options
                                    setSelectedFilters(tempSelectedFilters)
                                }}
                                styles={selectStylesExclude()}

                                components={{ IndicatorSeparator: () => null }}

                                options={groupedTaglist}

                                formatGroupLabel={formatGroupLabel} key={groupedTaglist}


                                placeholder="Tag search..."
                                isMulti
                            />
                        </div>
                    </div>
                </div>
                <div className="text-green-400 mt-2">back to <Link to="/"><u>home</u></Link> :)</div>

                <div className="flex flex-row justify-evenly flex-wrap w-4/5 px-5 py-2 gap-y-2"
                    key={selectedFilters}>
                    {
                        getFilteredArtByPriority().map((filename) => {
                            return <div className="">
                                <GalleryImage filename={filename} />
                            </div>

                        })
                    }

                </div>
            </div>
        </div>

    )

}


{/*<div className="flex flex-col px-10 w-2/3">
                {jsonRange.map((index) => {
                    return <div className="flex flex-row" key={index}>
                        {
                            [...Array(numGalleryCols).keys()].map((filenameIndex) => {
                                let filename = Object.keys(portfolioJson)[(index + 1) * numGalleryCols + filenameIndex - 1]
                                console.log(filename)
                                return <img src={"assets/pics/" + filename}
                                    className={"object-contain grow h-64"}
                                    key={filenameIndex} />

                            })
                        }
                    </div>
                })
                }
            </div>
*/}