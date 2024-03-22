import {useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {VscChevronRight} from "react-icons/vsc"
import {CheckIcon} from "@heroicons/react/24/outline"

interface Props {
    variant: string,
    options: VariantOptionInterface[],
    pickOption: (variant_id:string, option_id:string) => void
    checkStock: (variant_id:string, option_id:string) => number
}

const OptionSelect = ({variant, options, pickOption, checkStock}:Props) => {
    const [pickedOption, setPickedOption]
        = useState<VariantOptionInterface>()

    const [open, setOpen] = useState<boolean>(false)

    return(
        <AnimatePresence>
        <motion.div className={"relative w-full transition-all"} onClick={() => setOpen(!open)} onBlur={() => setOpen(false)}>
            <motion.div
                className={"flex flex-row items-center p-2 px-4 text-sm text-gray-500 border border-gray-500 hover:cursor-pointer "
                    + (open ? "rounded-t-lg border-b-0" : "rounded-lg")}>
                <div className={"grow"}>
                {
                    pickedOption ?
                        <div className={"text-black"}>
                            {pickedOption.name}
                        </div> :
                        <div className={"text-xs"}>
                            select size
                        </div>

                }
                </div>
                <motion.div
                    animate={{
                        rotate: open ? 90 : 0
                    }}
                    className="leading-7 text-sm"
                >
                    <VscChevronRight></VscChevronRight>
                </motion.div>
            </motion.div>
            {
                open && (
                <motion.div
                    className={"absolute bg-white z-50 w-full border border-black rounded-b-lg text-xs flex flex-col gap-1"}
                    initial={{ opacity: 0, height: 0, y: 0 }}
                    animate={{
                        opacity: 1,
                        height:"auto",
                        y: 0,
                        transition: {
                            duration: 0.2,
                        },
                    }}
                    exit={{ opacity: 0, height:0, y: -30}}
                >
                {
                    options.map(option => {
                        return(
                            <motion.div key={option._id} className={"mx-1"}>
                                {
                                    checkStock(variant, option._id) > 0 ?
                                        pickedOption && option._id === pickedOption._id ?
                                            <motion.div className={"flex flex-row items-center justify-between p-2 px-4 rounded-lg bg-black text-white font-semibold hover:cursor-pointer"}>
                                                <div>{option.name}</div>
                                                <div><CheckIcon width={12} height={12}/></div>
                                            </motion.div> :

                                            <motion.div
                                                onClick={() => {
                                                    setPickedOption(option);
                                                    pickOption(variant, option._id)
                                                }}
                                                className={"p-2 px-4 rounded-lg hover:cursor-pointer hover:bg-gray-100"}
                                            >
                                                {option.name}
                                            </motion.div>

                                        :
                                        <motion.div className={"opacity-50 p-2 px-4 hover:cursor-default line-through"}>
                                            {option.name}
                                        </motion.div>
                                }
                            </motion.div>
                        )
                    })
                }
                </motion.div>)
            }
        </motion.div>
        </AnimatePresence>
    )
}

export default OptionSelect