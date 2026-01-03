"use client"

import Navbar from "../components/Navbar.js"
import {useRef} from "react"
import { useState } from "react"


export default function Upload() {
    const fileInputRef = useRef(null)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(null)

    async function sendToApi () {
        setLoading(true)
        try {
            const form = new FormData()
            form.append ("image", image)
            const res = await fetch ("/api/analyse", {
                method: "POST",
                body: form,
            })
            const data = await res.json()
            console.log(data) 
            setResult (data.result)
            setLoading (false)
        }
        catch (error) {
            console.log ("Error occured")
            setResult ("Error occured")
        }

    }
    return (
        <>
        <Navbar/>
        <div className = "flex justify-center items-center h-screen flex-row gap-10">
            <div className = "border-1 h-[500px] w-[500px] rounded-lg flex flex-col">
                <input 
                ref = {fileInputRef} 
                type = "file" 
                className = "hidden" 
                onChange = {(event) => {
                    const data = event.target.files[0]
                    setPreview(URL.createObjectURL(data));
                    setImage(data)
                }}
                />
                {image ? <img className = "flex-1 max-h-full max-w-full     object-contain mx-auto my-auto" src = {preview}/>: <p className = "flex-1 flex items-center justify-center"> Upload an image </p>}
            </div>

            <div >
                <button className = "border-1 text-white bg-gray-800 px-5 py-1 rounded-sm mr-2" onClick = {() => {fileInputRef.current.click()}}> Upload</button>
                <button className = "border-1 text-white bg-gray-800 px-5 py-1 rounded-sm" onClick = {sendToApi}> {loading ? "Loading": "Submit"}</button>
            </div>

            <div className = "border-1 h-[500px] w-[500px] rounded-lg flex flex-col pl-3 pt-3">
                <p>Make: {result?.make ? result.make : ""}</p>
                <p>Model: {result?.model ? result.model : ""}</p>
                <p>Year: {result?.approximate_year ? result.approximate_year : ""}</p>
                <p>Confidence: {result?.confidence ? result.confidence : ""}</p>
                
            </div>
        </div>
        </>
    
    )
}