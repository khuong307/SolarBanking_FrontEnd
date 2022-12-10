import React from 'react'
import setTabID from "../redux/helper_functions.jsx";
function DebtList(){
    setTabID(4)
    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>DEBT LIST</h4>
                    <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Customer Panel</small>
                </div>
            </div>
        </div>
    )
}
export default DebtList
