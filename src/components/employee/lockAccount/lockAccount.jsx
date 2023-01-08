import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import LockInfoForm from "./lockInfoForm.jsx";
import Axios from "axios";
import NotFound from "../chargeMoney/not_found.jsx";
import axiosInstance from "../../../utils/axiosConfig.js";
import {useDispatch} from "react-redux";
import {changeByID} from "../../redux/counter.jsx";
function LockAccount(){
    const dispatch = useDispatch()
    dispatch(changeByID(4))
    const { register, handleSubmit, formState: { errors }} = useForm()
    const [customerData, setCustomerData] = useState('')
    const [transaction_info, setTransactionInfo] = useState('')
    const  onSubmitSearch = (data) =>{
        axiosInstance.get(`employee/customer/${data.account_number}`).then((result)=>{
            if(result.data.isFound === true){
                setCustomerData(result.data.customer_info)
            }else{
                setCustomerData("")
                $("#notFoundModal").modal("show")
            }
        })
        .catch((err)=>{
            alert(err)
        })
    }

    const preventSpace = function (e) {
        if(e.code === 'Space') e.preventDefault()
    }

    return (
        <div className="page-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                        <h4>LOCK ACCOUNT</h4>
                        <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Employee Panel</small>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mt-lg-1">
                        <div className="wrap">
                            <form className="search" onSubmit={handleSubmit(onSubmitSearch)} style={{fontFamily: "Jost"}}>
                                <input type="text" className="searchTerm" placeholder="Account Number / Username" onKeyDown={preventSpace}
                                   {...register("account_number", {
                                       required: true,
                                   })}
                                />
                                <button type="submit" className="searchButton">
                                    <i className="fa fa-search"></i>
                                </button>
                            </form>
                            {errors?.account_number?.type === "required" &&
                                <p className="mt-2" style={{fontFamily: "Jost", color: "#FFB800", textAlign: "center"}}><i className="fa fa-warning mr-2"></i>Information is required!</p>
                            }
                        </div>
                    </div>
                    <LockInfoForm customerData={customerData} setCustomerData={setCustomerData} setTransactionInfo={setTransactionInfo}/>
                    <NotFound/>
                </div>
            </div>
        </div>
    )
}
export default LockAccount
