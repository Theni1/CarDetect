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

    function resetImage () {
        setPreview (null)
        setImage (null)
        setResult (null)
    }

    async function sendToApi () {
        setLoading(true)
        setResult (null)
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
            setImage(null)
        }
        catch (error) {
            console.log ("Error occured")
            setResult ("Error occured")
        }

    }
    return (
        <>
        <Navbar/>
        <div className = "max-w-6xl mx-auto pt-24 grid grid-cols-2 gap-16 min-h-[calc(100vh-6rem)]">
            <div className = "flex flex-col items-center justify-center">
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
                <div className = "relative group">
                    {preview ? <img className = "max-w-[420px] rounded-lg" src = {preview} width = "420px" height = "420px"/>: ""}
                    {preview && !loading ? <button onClick = {resetImage}className = "text-xs text-neutral-400 hover:text-red-400 transition cursor-pointer">Delete</button>: ""}
                </div>
                {image ? <button onClick = {sendToApi} className="bg-white text-black px-6 py-3 mt-5 rounded-md text-sm font-medium hover:bg-gray-200 transition">{loading ? "Analyzing…" : "Run"}</button> : <button onClick = {() => fileInputRef.current.click()} className="bg-white text-black mt-5 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-200 transition">Upload</button>}
            </div>

            <div className = "flex items-center justify-center">
                <div className = "bg-black border border-neutral-800 h-[420px] w-[420px] rounded-xl p-6 text-white flex flex-col">
                    {result ?
                            <>
                            <div className="space-y-6">
      
                                <div>
                                    <p className="text-xs tracking-wide text-neutral-400">MAKE</p>
                                    <p className="text-2xl font-medium">{result.make}</p>
                                </div>
                                <div>
                                    <p className="text-xs tracking-wide text-neutral-400">MODEL</p>
                                    <p className="text-2xl font-medium">{result.model}</p>
                                </div>
                                <div>
                                    <p className="text-xs tracking-wide text-neutral-400">YEAR</p>
                                    <p className="text-2xl font-medium">{result.approximate_year}</p>
                                </div>

                                <div>
                                    <p className="text-xs tracking-wide text-neutral-400 mb-1">CONFIDENCE</p>
                                    <div className="w-full bg-neutral-800 rounded-full h-2">
                                    <div
                                        className="bg-white h-2 rounded-full transition-all"
                                        style={{ width: `${Math.round(result.confidence * 100)}%` }}
                                    />
                                    </div>
                                    <p className="text-sm text-neutral-400 mt-1">
                                    {Math.round(result.confidence * 100)}%
                                    </p>

                                </div>
                            </div>
                            </>
                            
                    :""}  
                </div>
            </div>
        </div>
        </>

    )
}