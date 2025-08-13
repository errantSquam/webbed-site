import { React, useState } from "react"
import { Link } from "react-router-dom"



export default function Gallery() {
    return (
    <div className = "py-10 px-10 flex flex-col items-center text-center">
        <h1 className = "text-2xl font-bold">Gallery</h1>
        <div>pics go here</div>
        <div>back to <Link to = "/"><u>home</u></Link></div>
    </div>

    )

}