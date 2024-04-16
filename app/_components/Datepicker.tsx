import {useState} from "react";
import {BsChevronLeft, BsChevronRight, BsChevronCompactUp, BsChevronCompactDown} from 'react-icons/bs'
import ComponentAccordion from "./ComponentAccordion";
import {CalendarDaysIcon, ClockIcon} from "@heroicons/react/24/outline";

interface Props {
    title: string,
    setter: (value: string) => void,
}

const Datepicker = ({title, setter}:Props) => {
    const [expanded, setExpanded] = useState(false)

    const date = new Date()
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth()+1)
    const [day, setDay] = useState(date.getDate())

    const [hour, setHour] = useState(date.getHours())
    const [minutes, setMinutes] = useState(date.getMinutes())

    const [previewYear, setPreviewYear] = useState(date.getFullYear())
    const [previewMonth, setPreviewMonth] = useState(date.getMonth()+1)

    const days = ["Pn", "Wt", "Śr", "Czw", "Pt", "Sb", "Ndz"]
    const locale = 'pl'

    const formatCurrentMonth = (month:number, year:number) => {
        let first = new Date(year, month - 1, 1).getDay()
        const maxDay = new Date(year, month, 0).getDate()

        if(first === 0) first = 7

        const cmonth = []

        for(let i = 1; i < first + maxDay; i++){
            cmonth.push(i < first ? null : i-first+1)
        }

        return cmonth
    }

    const getMonthFullName = () => {
        return new Date(previewYear, previewMonth - 1, 5).toLocaleString(locale, { month: 'long' })
    }

    const prevMonth = () => {
        if(previewMonth === 1){
            setPreviewMonth(12)
            setPreviewYear(previewYear - 1)
        }
        else{
            setPreviewMonth(previewMonth - 1)
        }
    }

    const nextMonth = () => {
        if(previewMonth === 12){
            setPreviewMonth(1)
            setPreviewYear(previewYear + 1)
        }
        else{
            setPreviewMonth(previewMonth + 1)
        }
    }

    const leadingZero = (val:number) => {
        return String(val).padStart(2, '0')
    }

    const pickDate = (pDay:number) => {
        setDay(pDay)
        setMonth(previewMonth)
        setYear(previewYear)
    }

    return(
        <div>
            <div className={"text-xs text-gray-700 m-1"}>
                {title}
            </div>

        <div className="bg-white rounded-xl p-4 py-3 border border-gray-300">
        <ComponentAccordion expanded={expanded} setExpanded={setExpanded} header={
                <div className="text-center text-gray-900 hover:cursor-pointer font-normal flex items-center gap-0.5">
                    <CalendarDaysIcon width={14} height={14}/>
                    {leadingZero(day)}/{leadingZero(month)}/{year}
                    <div className={"mx-0.5"}></div>
                    <ClockIcon width={14} height={14}/>
                    {leadingZero(hour)}:{leadingZero(minutes)}
                </div>
            }>
            <div className="flex flex-row flex-wrap mt-8">
                <div className="lg:w-2/3 w-full">
                    <div className="flex flex-row justify-between justify-items-center items-center mb-4 text-gray-500">
                        <BsChevronLeft className="flex-none w-4 h-4 hover:cursor-pointer" onClick={prevMonth} />
                        <p className="grow text-center font-semibold">{getMonthFullName()} {previewYear}</p>
                        <BsChevronRight className="flex-none w-4 h-4 hover:cursor-pointer" onClick={nextMonth} />
                    </div>
                    <div className="grid grid-cols-7 gap-1 gap-y-1 justify-items-center">
                        {
                            days.map(day => {
                                return(
                                    <div key={day} className="font-semibold text-gray-700">{day}</div>
                                )
                            })
                        }
                        {
                            formatCurrentMonth(previewMonth, previewYear).map((d,i) => {
                                return(
                                    <div key={i}
                                         className={"flex justify-items-center items-center text-center hover:cursor-pointer w-10 h-10 " + (d === day && previewMonth === month && previewYear === year ? "bg-gray-200 rounded-full" : "")}
                                         onClick={() => d && pickDate(d)}
                                    >
                                        <p className="w-full text-sm">
                                            {d}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="lg:w-1/3 w-full text-center my-4 md:my-0">
                    <div className="flex flex-col items-center align-middle w-full h-full justify-center">
                        <div className="flex flex-row items-center align-middle w-full justify-center text-gray-400 text-2xl gap-6">
                            <div className="hover:cursor-pointer hover:text-gray-800" onClick={() => setHour(hour === 23 ? 0 : hour + 1)}><BsChevronCompactUp/></div>
                            <div className="hover:cursor-pointer hover:text-gray-800" onClick={() => setMinutes(minutes === 59 ? 0 : minutes + 1)}><BsChevronCompactUp/></div>
                        </div>
                        <div className="flex flex-row items-center align-middle w-full justify-center text-gray-700 text-4xl py-6">
                            <div>{leadingZero(hour)}</div>
                            <div>:</div>
                            <div>{leadingZero(minutes)}</div>
                        </div>
                        <div className="flex flex-row items-center align-middle w-full justify-center text-gray-400 text-2xl gap-6">
                            <div className="hover:cursor-pointer hover:text-gray-800" onClick={() => setHour(hour === 0 ? 23 : hour - 1)}><BsChevronCompactDown/></div>
                            <div className="hover:cursor-pointer hover:text-gray-800" onClick={() => setMinutes(minutes === 0 ? 59 : minutes - 1)}><BsChevronCompactDown/></div>
                        </div>
                    </div>
                </div>
            </div>
            </ComponentAccordion>
        </div>
        </div>
    )
}

export default Datepicker