import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

const Carousel = ({items}) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = (e) => {
        e.preventDefault()
        const newIndex = currentIndex === 0 ? items.length -1 : currentIndex - 1
        setCurrentIndex((currentIndex) == 0 ? items.length - 1 : currentIndex - 1)
    }

    const nextSlide = (e) => {
        e.preventDefault()
        setCurrentIndex((currentIndex + 1) % items.length)
    }

    return(
        <div className="relative">
            <button 
                onClick={(e) => prevSlide(e)} 
                className="absolute top-[50%] translate-y-[-50%] mx-2"
            >
                <ChevronLeftIcon className="w-6 h-6 text-gray-300" />
            </button>
            <img src={items[currentIndex]} className="h-screen mx-auto" />
            <button 
                onClick={(e) => nextSlide(e)}
                className="absolute top-[50%] translate-y-[-50%] mx-2 right-0"
            >
                <ChevronRightIcon className="w-6 h-6 text-gray-300" />
            </button>
        </div>
    )
}

export default Carousel