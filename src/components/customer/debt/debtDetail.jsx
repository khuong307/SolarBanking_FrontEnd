import React,{useState,useEffect} from "react";
import axiosInstance from '../../../utils/axiosConfig.js'

function debtDetail(){
    return(
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>Debt Details</h4>
                    <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Debt Detail</small>
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Account Number</label>
                                <p className="card-text"></p>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Amount</label>
                                <p className="card-text"></p>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Status</label>
                                <p className="card-text"></p>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Date</label>
                                <p className="card-text"></p>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Message</label>
                                <p className="card-text"></p>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Cancel Message</label>
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Payment</button>
                        <button className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default debtDetail