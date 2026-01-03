"use client"

import {useRef} from "react"
import { useState } from "react"


export default function Upload() {
    const fileInputRef = useRef(null)
    const [image, setImage] = useState(null)
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
        <div className = "flex justify-center items-center h-screen flex-row gap-50">
            <div className = "border-2 h-100 w-100">
                <input 
                ref = {fileInputRef} 
                type = "file" 
                className = "hidden" 
                onChange = {(event) => {
                    const data = event.target.files[0]
                    setImage(data)
                }}
                ></input>
                <button className = "border-1 text-white bg-gray-800 px-5 py-1 rounded-sm" onClick = {() => {fileInputRef.current.click()}}> Upload</button>
                <button className = "border-1 text-white bg-gray-800 px-5 py-1 rounded-sm" onClick = {sendToApi}> {loading ? "Loading": "Submit"}</button>
            </div>
            <div className = "border-2 h-100 w-100">
                <p>Make: {result?.make ? result.make : ""}</p>
                <p>Model: {result?.model ? result.model : ""}</p>
                <p>Year: {result?.approximate_year ? result.approximate_year : ""}</p>
                <p>Confidence: {result?.confidence ? result.confidence : ""}</p>
                <p>Top Posts about this car:</p>
                
            </div>
        </div>
    
    )
}