"use client"
import {useRef} from "react"


export default function Upload() {
    const fileInputRef = useRef(null)

    function sendToApi () {
        console.log("Sent to API")
    }
    return (
        <div className = "flex justify-center items-center h-screen flex-row gap-50">
            <div className = "border-2 h-100 w-100">
                <input 
                ref = {fileInputRef} 
                type = "file" 
                className = "hidden" 
                onChange = {(event) => {
                    const file = event.target.files[0]
                    console.log(file)

                }}
                ></input>
                <button className = "border-1 text-white bg-gray-800 px-5 py-1 rounded-sm"onClick = {() => {fileInputRef.current.click()}}> Upload</button>
            </div>
            <div className = "border-2 h-100 w-100">
                <p></p>
            </div>
        </div>
    
    )
}