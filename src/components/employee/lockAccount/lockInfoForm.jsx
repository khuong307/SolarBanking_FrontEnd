import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {Helmet} from "react-helmet";
import numeral from "numeral";
import Axios from "axios";
import axiosInstance from "../../../utils/axiosConfig.js";

function LockInfoForm(props){
    const { register, handleSubmit, formState: { errors }, reset} = useForm()
    const [transfer, setTransfer] = useState('')
    function onSubmitCharge(data){
        setTransfer({
            account_number: data.account_number,
            amount: data.amount_of_money,
            message: "SOLAR BANKING TRANSFER " + data.amount_of_money + " VND at " + new Date().toISOString()
        })
        $("#confirmModal").modal("show")
    }

    function conductLocking(){
        var path = ""
        if (props.customerData.isLock == true){
            path = `/users/${props.customerData.customer_id}/spendingAccounts/unlock`
        }else{
            path = `/users/${props.customerData.customer_id}/spendingAccounts/lock`
        }
        axiosInstance.post(path).then((result)=>{
            $("#confirmModal").modal("hide")
            reset()
            props.setCustomerData('')
        })
        .catch((err)=>{
            alert(err)
        })
    }

    return(
        <>
            {
                typeof props.customerData === 'object' &&(
                    <div className="card mt-5">
                        <div className="card-body">
                            <form className="row" onSubmit={handleSubmit(onSubmitCharge)}>
                                <div className="col-lg-12 d-flex align-items-center align-content-center mt-3" style={{fontFamily: "Jost"}}>
                                    <div className="col-lg-4 form-group">
                                        <label><i className="fa fa-user mr-1"></i>Fullname:</label>
                                        <input type="text" className="form-control" value={props.customerData.full_name} readOnly
                                               {...register("full_name", {
                                                   required: true,
                                               })}
                                        />
                                    </div>
                                    <div className="col-lg-4 form-group">
                                        <label><i className="fa fa-envelope mr-1"></i>Email:</label>
                                        <input type="text" className="form-control" value={props.customerData.email} readOnly
                                               {...register("email", {
                                                   required: true,
                                               })}
                                        />
                                    </div>
                                    <div className="col-lg-4 form-group">
                                        <label><i className="fa fa-phone mr-1"></i>Phone:</label>
                                        <input type="text" className="form-control" value={props.customerData.phone} readOnly
                                               {...register("phone", {
                                                   required: true,
                                               })}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12 d-flex align-items-center align-content-center mt-3 justify-content-center" style={{fontFamily: "Jost"}}>
                                    <div className="col-lg-4 form-group">
                                        <label><i className="fa fa-user mr-1"></i>Account Number:</label>
                                        <input type="text" className="form-control" value={props.customerData.account_number} readOnly
                                               {...register("account_number", {
                                                   required: true,
                                               })}
                                        />
                                    </div>
                                    <div className="col-lg-4 form-group">
                                        <label><i className="icofont icofont-money mr-1"></i>Balance (VND):</label>
                                        <input type="text" className="form-control" value={numeral(props.customerData.balance).format('0,0')} readOnly
                                               {...register("balance", {
                                                   required: true,
                                               })}
                                        />
                                    </div>
                                    <div className="col-lg-4 form-group">

                                    </div>
                                </div>
                                <div className="col-lg-12 d-flex justify-content-center">
                                    {props.customerData.isLock == true?
                                        <button className="btn btnLogin2" type="submit" style={{fontFamily: "Jost"}}>
                                            <i className="fa fa-unlock"></i> Unlock Account
                                        </button>
                                        :
                                        <button className="btn btnLogin2" type="submit" style={{fontFamily: "Jost"}}>
                                            <i className="fa fa-lock"></i> Lock Account
                                        </button>
                                    }

                                </div>
                                <Helmet>
                                    <script src="/src/assets/js/autoNumeric.js" />
                                </Helmet>
                            </form>
                        </div>
                        <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="animate-widget">
                                            <div className="col-sm-12">
                                                <div className="custom-card" style={{fontFamily: "Jost"}}>
                                                    <div className="text-center" style={{color: "#FFB800", fontSize:"20px"}}><b>
                                                        {props.customerData.isLock ==  true?
                                                            `UNLOCK THIS ACCOUNT?`
                                                            :`LOCK THIS ACCOUNT?`
                                                        }
                                                    </b></div>
                                                    <img className="img-fluid img-100 d-block" src="/src/assets/img/question_icon.png" style={{marginLeft: "auto", marginRight: "auto"}}/>
                                                    <div className="mt-1 mb-2 text-center" style={{fontSize: "15px"}}>
                                                        <div><i className="fa fa-user mr-1"></i>: {props.customerData.account_number}</div>
                                                        <div><i className="fa fa-envelope mr-1"></i> :{props.customerData.email}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer" style={{fontFamily: "Jost"}}>
                                        <button type="button" className="btn btn-light"
                                                data-dismiss="modal">Close
                                        </button>
                                        <button type="button" className="btn btnLogin2 d-flex align-items-center align-content-center" onClick={()=>conductLocking()}>
                                                Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default LockInfoForm