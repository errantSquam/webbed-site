import { React, useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Select from "react-select"
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();



export default function Gallery() {

    const [portfolioJson, setPortfolioJson] = useState({})
    const [portfolioTags, setPortfolioTags] = useState({})
    const [groupedTaglist, setGroupedTaglist] = useState([])
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

    const numGalleryCols = 3


    useEffect(() => {
        fetch('assets/portfolio.json').then((res) => res.json()).then((data) => {
            setPortfolioJson(data)

        })
        fetch('assets/portfoliotags.json').then((res) => res.json()).then((data) => {
            setPortfolioTags(data)
            let tempTagList = {}

            for (let i = 0; i < Object.keys(data).length; i++) {
                let tagName =  Object.keys(data)[i]
                let tagtype = data[tagName].tagType
                if (tempTagList[tagtype] === undefined) {
                    tempTagList[tagtype] = [tagName]
                } else{
                    tempTagList[tagtype].push(tagName)
                }
            }

            let tempGroupTagList = Object.keys(tempTagList).map((tagType) => {
                return {label: tagType,
                        options: tempTagList[tagType].map((tagName) => {
                            return {value: tagName,
                            label: <span className = {"px-2 rounded text-white " + tagsColorDict[tagType]}>{data[tagName].fullName}</span>,
                            "tagType": tagType
                            }
                        })
                }
            })
            console.log(tempGroupTagList)
            setGroupedTaglist(tempGroupTagList)
            

        })

    }, [])

    let jsonRange = [...Array(Math.floor(Object.keys(portfolioJson).length / numGalleryCols)).keys()]

    const TagBlock = ({ tagData }) => {
        return <div className={"px-2 py-1 text-xs text-white rounded " + tagsColorDict[tagData.tagType]}>{tagData.fullName}</div>
    }

    const GalleryImage = ({ filename }) => {
        let [isOpen, setIsOpen] = useState(false)

        function open() {
            setIsOpen(true)
        }

        function close() {
            setIsOpen(false)
        }

        let fullTags = portfolioJson[filename].tags.map((tag) => {
            return Object.keys(portfolioTags).length !== 0 && portfolioTags[tag]
        })

        let artDesc = portfolioJson[filename].description

        //console.log(fullTags)


        return <>
            <div className = " p-1 flex flex-row">
                <img src={"assets/pics/" + filename}
                className={"object-cover h-64 rounded-lg"}
                key={filename}
                onClick={() => setIsOpen(true)} />

            </div>



            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-full h-screen overflow-y-auto bg-black/70">
                    <div className="flex min-h-full items-center justify-center">
                        <DialogPanel
                            transition
                            className="duration-50 ease-in 
                            data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <div className="h-full flex items-center justify-center">
                                <div className="flex flex-row px-4 justify-center">
                                    <div className = "flex flex-col space-y-2 pt-2 max-w-1/4">
                                        <p className="mt-2 text-sm/6 text-white/50">
                                            <div className="flex flex-row flex-wrap space-x-2 gap-y-2">
                                                {fullTags.map((tag) => (<TagBlock tagData={tag} />))}
                                            </div>
                                        </p>
                                        <p className = "text-white text-sm"><b>Description: </b>
                                            {artDesc !== "" ? artDesc : <i>None</i> }
                                        </p>

                                    
                                        
                                        <div className="mt-4">
                                            <Button
                                                className="inline-flex items-center gap-2 rounded-md 
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
                                    
                                    <div className={"grow-3 flex items-center justify-center"}>
                                        <img src={"assets/pics/" + filename}
                                        className = {"max-h-screen py-4"}/>
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

    return (
        <div className="min-h-screen bg-zinc-800">
            <div className=" px-10 flex flex-col items-center text-center">
                <div className = "py-1 w-screen bg-orange-900 mb-2">
                    <h1 className="text-2xl font-bold text-orange-100 font-pirulen">Gallery</h1>
                </div>
                <div className="text-green-400 mb-2">back to <Link to="/"><u>home</u></Link></div>

                <div className="text-green-400">filter :)</div>

                <div className = "w-2/3 text-left text-sm">
                    <Select 
                    styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: 'black',
                          borderColor: 'var(--color-zinc-500)',
                          
                        }),
                        menu: (menuStyles, state) => ({
                            ...menuStyles,
                            backgroundColor: state.isFocused ? 'var(--color-zinc-800)' : 'black',
                            
                          }),
                        option: (menuStyles, state) => ({
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
                              return{...styles,
                              backgroundColor: colorvar,}
                            },
                      }}
                    
                      components = {{IndicatorSeparator:() => null}}
                    
                    options = {groupedTaglist} 

                    formatGroupLabel = {formatGroupLabel} key = {groupedTaglist}
                    
                    
                    placeholder = "Tag search..."
                    isMulti
                    />
                </div>
                <div className="flex flex-row justify-evenly flex-wrap w-4/5 p-5 gap-y-2">
                    {
                        Object.keys(portfolioJson).map((filename) => {
                            //console.log(filename)
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