import React, {useState} from 'react'
import setTabID from "../redux/helper_functions.jsx";
function AddNewCustomer(){
    setTabID(1)
    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>ADD NEW CUSTOMER</h4>
                    <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Employee Panel</small>
                </div>
            </div>
        </div>
    )
}

export default AddNewCustomer