import React,{useState,useEffect} from "react";
import axiosInstance from '../../../utils/axiosConfig.js';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Button, Modal} from "antd";

function createDebt(){
    const navigate = useNavigate();
    const [accountNumber,setAccountNumber] = useState("");
    const [isShowModal,setIsShowModal] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm();
    const userId = localStorage.solarBanking_userId;
    let isSuccess = false;

    const handleChangeAccount = (e) =>{
        setAccountNumber(e.target.value);
    }
    const handleModalOk = ()=>{
        setIsShowModal(false);
    }
    const handleModalCancel = ()=>{
        setIsShowModal(false);
    }
    const handleAcceptBtn = ()=>{
        if (isSuccess){
            navigate('/debtList');
        }
    }
    const onSubmit = function (data){
        e.preventDefault();
        try {
            const apiPath = "/debtList";
            axiosInstance.post(apiPath,{
                user_id: userId,
                debt_account_number: data.account_number,
                debt_amount: data.amount,
                debt_message: data.message
            }).then(function(res){
                console.log(res);

                if (res.data.isSuccess === true){
                    isSuccess = true;
                }
                setIsShowModal(true);
            })
            .catch((err)=>{
                console.log(err.message())
            })
        }catch (err){
            console.log(err.message())
        }
    };
    const handleBackToList = function(){
        navigate('/debtList');
    }


    return(
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="title">
                            <h4>CREATE NEW DEBT</h4>
                            <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Debt List</small>
                        </div>
                        <div className="direction">
                            <div className="float-right mr-3 mb-3">
                                <button className="btn btn-light" onClick={()=>{navigate("/customer/debtList")}}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <form onSubmit={handleSubmit(onSubmit)} className="theme-form mega-form col-md-12">
                                <div className="form-group col-md-12">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Account Number <span className="required">(*)</span> </label>
                                    <input type="text" className="form-control" placeholder="Enter account number"
                                           {...register("account_number", {
                                               required: true,
                                           })}
                                        onChange={handleChangeAccount}
                                    />
                                    {errors?.account_number?.type === "required" &&
                                        <p className="error-input"><i className="fa fa-warning mr-2"></i>Account Number is required!</p>
                                    }
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Full name</label>
                                    <input type="text" className="form-control" disabled={true} placeholder="Full name"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Email</label>
                                    <input type="text" className="form-control" disabled={true} placeholder="Email"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Phone</label>
                                    <input type="text" className="form-control" disabled={true} placeholder="Phone"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Amount <span className="required">(*)</span></label>
                                    <input type="text" className="form-control" placeholder="Enter amount"
                                           {...register("amount", {
                                               required: true,
                                           })}
                                    />
                                    {errors?.amount?.type === "required" &&
                                        <p className="error-input"><i className="fa fa-warning mr-2"></i>Amount is required!</p>
                                    }
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Message</label>
                                    <textarea rows={3} className="form-control" placeholder="Enter message"

                                              {...register("message", {
                                                  required: false,
                                              })}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <button className="btn btn-primary" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Modal title="Notification"
                           centered
                           open={isShowModal}
                           onOk={handleModalOk}
                           onCancel={handleModalCancel}
                           footer={[
                               <Button key="submit" type="primary" onClick={handleAcceptBtn}>
                                   Ok
                               </Button>,
                           ]}
                    >
                        <p className="modal-message">Create debt reminder successfully</p>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default createDebt