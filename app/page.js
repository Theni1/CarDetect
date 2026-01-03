import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      
      <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-center">Car Detect </h1>
      
      <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl text-center"> Upload an image of a car and instantly get its make, model and year. </p>
    
      <div className="mt-10 flex gap-4">
        <Link className="bg-white text-black px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-200 transition" href = "/upload"> Try it now </Link>
      </div>
      
    </div>

  );
}
