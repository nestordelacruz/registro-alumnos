import React from "react";

export default function userRegistrationStatus(userStatus) {
    if (userStatus == true) { 
	return (
        <div className="userStatus-div">
            <p> Estudiante se encuentra registrado.</p>
        </div>
    	);
} 
	return (
	<div className="userStatus-div">
            <p> Estudiante no se encuentra registrado.</p>
        </div>
	)
}

