"use client"
import {useRef} from "react"
import { useState } from "react"


export default function Upload() {
    const fileInputRef = useRef(null)
    const [file, setFile] = useState(null)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(null)

    async function sendToApi () {
        console.log("Sent to API")
        setLoading(true)
        try {
            const form = new FormData()
            form.append ("image", file)
            const res = await fetch ("/api/analyse", {
                method: "POST",
                body: form,
            })
            const data = await res.json()
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
                    setFile(data)
                    console.log(file)
                }}
                ></input>
                <button className = "border-1 text-white bg-gray-800 px-5 py-1 rounded-sm" onClick = {() => {fileInputRef.current.click()}}> Upload</button>
                <button className = "border-1 text-white bg-gray-800 px-5 py-1 rounded-sm" onClick = {sendToApi}> {loading ? "Loading": "Submit"}</button>
            </div>
            <div className = "border-2 h-100 w-100">
                <p></p>
            </div>
        </div>
    
    )
}