import Link from "next/link"

export default function Navbar() {
    return (
        <nav className = "fixed top-0 w-full bg-black border-b border-gray-800 px-8 py-4 flex justify-between items-center">
            <span className="text-white font-medium">Car Detect</span>
            <div className = "flex gap-6 text-gray-300 text-sm">
                <Link className = "hover:text-white" href = "/">Home</Link>
                <Link className = "hover:text-white href" href = "/upload">Upload</Link>
            </div>
        </nav>
    )
}