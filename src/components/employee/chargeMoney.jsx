import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import ChargeInfoForm from "./chargeInfoForm.jsx";
import Axios from "axios";
import NotFound from "./not_found";
function ChargeMoney(){
    const { register, handleSubmit, formState: { errors }} = useForm()
    const [customerData, setCustomerData] = useState('')
    const [isFound, setFound] = useState('')
    const  onSubmitSearch = (data) =>{
        let promise = Axios({
            url: `http://localhost:3030/api/employee/customer/${data.account_number}`,
            method: "GET",
        })
        promise.then((result)=>{
            if(result.data.isFound === true){
                setCustomerData(result.data.customer_info)
                setFound(true)
            }else{
                setCustomerData("")
                setFound(false)
            }
        })
        promise.catch((err)=>{
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
                        <h4>CHARGE MONEY</h4>
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
                    <ChargeInfoForm customerData={customerData} setCustomerData={setCustomerData}/>
                    <NotFound isFound={isFound}/>
                </div>
            </div>
        </div>
    )
}
export default ChargeMoney
