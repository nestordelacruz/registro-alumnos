import React from 'react';

export default function ExpiredIDPopup(props){
    return(props.trigger) ? (
        <div className="expired-popup"> 
            <div className="expired-popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>x</button>
                { props.children }
            </div>
        </div>
    ) : "";
}   
