'use client'

import Image from "next/image"
import {useEffect, useState, useRef} from 'react'
import {motion} from 'framer-motion'

export default function Slider(){
    const slides = [
        {
            title: "LV1",
            link: "https://media.gq-magazine.co.uk/photos/61ee846f2bcbf0978c2b7ad3/16:9/w_2560%2Cc_limit/GettyImages-1237867849.jpg"
        },
        {
            title: "LV2",
            link: "https://images.complex.com/images/c_crop,h_2388,w_4245,x_135,y_402/c_limit,h_1080,w_1920/xevtcyul940eqmgamddp/louis-vuitton-fall-winter-2022-2023.jpg"
        },
        {
            title: "LV3",
            link: "https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--Women_RW_Show_SS20_V2_DI3.jpg?wid={IMG_WIDTH}&hei={IMG_HEIGHT}"
        }
    ]

    const delay = 7000

    const [index, setIndex] = useState(0)
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    useEffect(() => {
        resetTimeout()
        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
    
        return () => {
          resetTimeout();
        };
    }, [index])

    return(
        <div className="w-full z-0">
            <div className="w-full overflow-hidden">
      <motion.div
        className="flex flex-nowrap"
        animate={{
            x: `calc(${-index} * 100%)`
        }}
        transition={{ type: "tween", stiffness: 300 }}
      >
        {slides.map((item, index) => (
          <div
            className="min-w-full basis-full"
            key={index}
          >
            <img src={item.link} className="rounded-md"></img>
          </div>
        ))}
      </motion.div>

      <div className="slideshowDots flex flex-row justify-center my-2">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot ${index === idx ? "bg-gray-400" : "bg-gray-100"} m-2 w-2 h-2 rounded-full hover:cursor-pointer`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
        </div>
    )
}

/**/