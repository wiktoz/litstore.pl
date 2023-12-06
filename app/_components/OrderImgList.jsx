import { useState, useEffect } from "react"


export default function List(props) {
  const [items, setItems] = useState(props.children)

  useEffect(()=>{
    setItems(props.children)
  }, [props.children])

const func = () => {
  console.log("ordr")
}

  return (
    <>
    
    </>
  )
}