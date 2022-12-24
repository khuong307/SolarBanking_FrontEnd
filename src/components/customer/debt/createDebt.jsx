import React,{useState,useEffect} from "react";
import axiosInstance from '../../../utils/axiosConfig.js';

function createDebt(){


    return(
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>Create new Debt</h4>
                    <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Debt List</small>
                    <div className="card-body">
                        <div className="row">
                            <form className="theme-form mega-form col-md-12">
                                <div className="form-group col-md-12">
                                    <label className="col-form-label">Account Number <span className="required">(*)</span> </label>
                                    <input type="text" className="form-control" placeholder="Enter account number"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">Full name</label>
                                    <input type="text" className="form-control" disabled={true} placeholder="Full name"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">Email</label>
                                    <input type="text" className="form-control" disabled={true} placeholder="Email"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">Phone</label>
                                    <input type="text" className="form-control" disabled={true} placeholder="Phone"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">Amount <span className="required">(*)</span></label>
                                    <input type="text" className="form-control" placeholder="Enter amount"/>
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="col-form-label">Message</label>
                                    <textarea rows={3} className="form-control" placeholder="Enter message"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Send Request</button>
                        <button className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default createDebt