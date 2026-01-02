import Link from "next/link"

export default function Navbar() {
    return (
        <nav className = "sticky top-0 bg-black flex justify-center h-20 items-center" >
            <ul>
                <li>
                <Link className = "text-white mr-35" href = "/">Home</Link>
                </li>
            </ul>
            <ul>
                <li>
                <Link className = "text-white" href = "/upload">Upload</Link>
                </li>
            </ul>
        </nav>
    )

}