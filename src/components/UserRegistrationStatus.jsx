import React from "react";

function userRegistrationStatus(props){
    return(props.userStatus) ? (
        <div className="userStatus-div">
            <p> Estudiante se encuentra registrado.</p>
        </div>
        ) : (
            <div className="userStatus-div">
                    <p> Estudiante no se encuentra registrado.</p>
                </div>
            );
}

export default userRegistrationStatus;
