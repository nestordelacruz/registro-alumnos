import React from 'react';

export default function LogInErrorPopup(props){
    return(props.trigger) ? (
        <div className="loginerror-popup"> 
            <div className="loginerror-popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>x</button>
                { props.children }
            </div>
        </div>
    ) : "";
}   
