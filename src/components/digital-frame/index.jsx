import React from "react";
import './index.css';
import DigitalMask from "../../assets/images/digital-frame.png";

const DigitalFrame = ({video}) => {
    return (
        <div className="digital-frame">
            <img src={DigitalMask} className='digital-mask'/>
            <video className='object-video' autoPlay muted loop src={video}/>
        </div>
    )
}

export default DigitalFrame;