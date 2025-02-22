import "../../../App.css"
import React from "react"

const Footer = () => {
  return (
    <div className='primaryBackground ' style={{height:'6vh', textAlign: "center", position: "relative", left: "0", right: "0", bottom: "0" }}>
        <h3 className="p-2 m-0">Bipin@2024</h3>
    </div>
  )
}


export default React.memo(Footer)