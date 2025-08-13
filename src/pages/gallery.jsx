import { React, useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"




export default function Gallery() {

    const [portfolioJson, setPortfolioJson] = useState({})
    const [portfolioTags, setPortfolioTags] = useState({})
    const numGalleryCols = 3


    useEffect(() => {
        fetch('assets/portfolio.json').then((res) => res.json()).then((data) => {
            setPortfolioJson(data)

        })
        fetch('assets/portfoliotags.json').then((res) => res.json()).then((data) => {
            setPortfolioTags(data)

        })

    }, [])

    let jsonRange = [...Array(Math.floor(Object.keys(portfolioJson).length / numGalleryCols)).keys()]

    const GalleryImage = ({filename}) => {

        return <div>
            <img src={"assets/pics/" + filename}
        className={"object-cover h-64"}
        key={filename} />
        {portfolioJson[filename].tags.map((tag) => {
            return portfolioTags[tag].fullName
        })}
        </div>

    }


    return (
        <div className="py-10 px-10 flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Gallery</h1>
            <div>pics go here</div>
            <div>back to <Link to="/"><u>home</u></Link></div>
            <div className="flex flex-row justify-evenly flex-wrap w-4/5 p-5 gap-y-2">
                {
                    Object.keys(portfolioJson).map((filename) => {
                                console.log(filename)
                                return <div className = " p-1"><GalleryImage filename = {filename}/>
                                    </div>

                            })
                 }
                
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