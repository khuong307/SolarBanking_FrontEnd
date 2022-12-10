import React, {useState} from 'react'
import setTabID from "../redux/helper_functions.jsx";
function EmployeeList(){
    setTabID(1)
    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>EMPLOYEE MANAGEMENT</h4>
                    <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Admin Panel</small>
                </div>
            </div>
        </div>
    )
}

export default EmployeeList