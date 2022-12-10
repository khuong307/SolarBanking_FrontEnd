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
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Form Vertical Wizard</h5>
                                </div>
                                <div className="card-body">
                                    <div id="wizard" className="wizard-4">
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
                                            <div className="col-sm-12 pl-0">
                                                <div className="form-group">
                                                    <label htmlFor="name">First Name</label>
                                                    <input type="text" className="form-control" id="name"
                                                           placeholder="Johan" required="required"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lname">Last Name</label>
                                                    <input type="text" className="form-control" id="lname"
                                                           placeholder="Deo"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="contact">Contact No.</label>
                                                    <input type="number" className="form-control digits" id="contact"
                                                           placeholder="123456789"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="step-2">
                                            <div className="col-sm-12 pl-0">
                                                <div className="form-group m-t-15">
                                                    <label htmlFor="exampleFormControlInput1">Email address</label>
                                                    <input type="email" className="form-control"
                                                           id="exampleFormControlInput1" placeholder="name@example.com"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Password</label>
                                                    <input type="password" className="form-control"
                                                           id="exampleInputPassword1" placeholder="Password"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                                    <input type="password" className="form-control"
                                                           id="exampleInputcPassword1" placeholder="Enter again"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="step-3">
                                            <div className="col-sm-12 pl-0">
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlInput1">Birthday:</label>
                                                    <input className="form-control digits" placeholder="dd-mm-yy"
                                                           type="date"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Age</label>
                                                    <input className="form-control digits" placeholder="Age"
                                                           type="text"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Have Passport</label>
                                                    <input className="form-control digits" placeholder="Yes/No"
                                                           type="text"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="step-4">
                                            <div className="col-sm-12 pl-0">
                                                <div className="form-group">
                                                    <label className="control-label">Country</label>
                                                    <input type="text" className="form-control mt-1"
                                                           placeholder="Country" required="required"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">State</label>
                                                    <input type="text" className="form-control mt-1" placeholder="State"
                                                           required="required"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">City</label>
                                                    <input type="text" className="form-control mt-1" placeholder="City"
                                                           required="required"/>
                                                </div>
                                            </div>
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