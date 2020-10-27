import React from 'react';
import './infoBar.css';

function InfoBar({room}) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
<img className="/image/onlineIcon.png" src="/image/onlineIcon.png" alt="onlineImage"></img>
<h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
            <a href="/" ><img src="/image/closeIcon.png" alt="clsoeTag"></img></a>

            </div>
            
        </div>
    )
}

export default InfoBar
