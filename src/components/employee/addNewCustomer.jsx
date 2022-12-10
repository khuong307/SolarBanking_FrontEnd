import React from 'react'
function AddNewCustomer(){
    return (
        <div className="page-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                        <h4>ADD NEW CUSTOMER</h4>
                        <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Employee Panel</small>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <div id="wizard" className="wizard-4" style={{fontFamily: "Jost"}}>
                                    <ul>
                                        <li>
                                            <a href="#step-1">
                                                Step 1
                                                <small>Registration</small>
                                            </a>
                                        </li>
                                        <li><a href="#step-2">
                                            Step 2
                                            <small>Email</small>
                                        </a>
                                        </li>
                                        <li><a href="#step-3">
                                            Step 3
                                            <small>Birth Date</small>
                                        </a>
                                        </li>
                                        <li className="pb-0"><a href="#step-4">
                                            Step 4
                                            <small>Login Info</small>
                                        </a>
                                        </li>
                                    </ul>
                                    <div id="step-1">
                                        Step 1
                                    </div>
                                    <div id="step-2">
                                        Step 2
                                    </div>
                                    <div id="step-3">
                                        Step 3
                                    </div>
                                    <div id="step-4">
                                        Step 4
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewCustomer