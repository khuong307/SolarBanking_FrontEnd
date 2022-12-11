import React, {useState, useEffect } from 'react'
import Axios from 'axios'
import {useForm} from "react-hook-form";
import SuccessModal from "./successModal.jsx";
function AddNewCustomer(){
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [account_number, setAccount] = useState("")
    useEffect(function (){$.ajax({
        url: 'http://localhost:3030/api/employee/bank_account',
        type: 'GET',
    }).done(function (res) {
        setAccount(res.spend_account)
    }).fail(function (err){
        alert(JSON.parse(err.responseText).message)
    })},[])

    setValue("spend_account", account_number)

    const [info, setInfo] = useState("1234")
    const onSubmit = (data) => {
        alert(JSON.stringify(data))
        if (data.password != data.confirmPassword){
            alert('Password does not match!')
            return
        }else{
            let promise = Axios({
                url: "http://localhost:3030/api/employee/customer",
                data: data,
                method: "POST",
            })
            promise.then((result)=>{
            })
            promise.catch((err)=>{
                setInfo(data)
                const status = err.response.status
                if (status === 409){
                    alert('This email or username has already been used!')
                }
                else if (status === 500){
                    alert('Internal Server Error')
                }
            })
        }
    }
    return (
        <div className="page-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                        <h4>ADD NEW CUSTOMER</h4>
                        <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Employee Panel</small>
                    </div>
                    <button data-toggle="modal" data-target="#successModal" className="btn btn-primary">
                        Run
                    </button>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-lg-12" style={{fontFamily: "Jost"}}>
                        <div className="card">
                            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                                <div id="wizard" className="wizard-4" >
                                    <ul>
                                        <li>
                                            <a href="#step-1">
                                                Step 1:
                                                <small>Personal Information</small>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#step-2">
                                                Step 2:
                                                <small>Login Info</small>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#step-3">
                                                Step 3:
                                                <small>Invidual Account:</small>
                                            </a>
                                        </li>
                                    </ul>
                                    <div id="step-1">
                                        <div className="col-sm-12 pl-0">
                                            <div className="form-group m-t-15">
                                                <label><i className="fa fa-user mr-2"></i>Fullname:</label>
                                                <input type="text" className="form-control" placeholder="Solar Banking"
                                                       {...register("full_name", {
                                                           required: true,
                                                       })}
                                                />
                                                {errors?.full_name?.type === "required" &&
                                                    <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Fullname is required!</p>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label><i className="fa fa-envelope mr-2"></i>Email Address:</label>
                                                <input type="email" className="form-control" placeholder="name@example.com"
                                                       {...register("email", {
                                                           required: true,
                                                           pattern: /^\S+@\S+$/i
                                                       })}
                                                />
                                                {errors?.email?.type === "required" &&
                                                    <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Email is required!</p>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label><i className="icofont icofont-phone"></i>Contact No:</label>
                                                <input type="tel" className="form-control digits" id="contact" style={{fontFamily: "Jost"}}
                                                       placeholder="123456789"
                                                       {...register("phone", {
                                                           required: true,
                                                       })}
                                                />
                                                {errors?.phone?.type === "required" &&
                                                    <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Phone number is required!</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div id="step-2">
                                        <div className="col-sm-12 pl-0">
                                            <div className="form-group m-t-15">
                                                <label><i className="fa fa-user mr-2"></i>Username:</label>
                                                <input type="text" className="form-control"
                                                       placeholder="solar_banking2022"
                                                       {...register("username", {
                                                           required: true,
                                                       })}
                                                />
                                                {errors?.username?.type === "required" &&
                                                    <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Username is required!</p>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label><i className="fa fa-lock mr-2"></i>Password:</label>
                                                <input type="password" className="form-control"
                                                       placeholder="Password"
                                                       {...register("password", {
                                                           required: true,
                                                       })}
                                                />
                                                {errors?.username?.type === "required" &&
                                                    <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Password is required!</p>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label><i className="fa fa-lock mr-2"></i>Confirm Password:</label>
                                                <input type="password" className="form-control" placeholder="Enter again"
                                                       {...register("confirmPassword", {
                                                           required: true,
                                                       })}
                                                />
                                                {errors?.confirmPassword?.type === "required" &&
                                                    <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Confirm password is required!</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div id="step-3">
                                        <div className="col-sm-12 pl-0">
                                            <div className="form-group m-t-15">
                                                <label><i className="fa fa-user mr-2"></i>Account Number: (Auto-Generated)</label>
                                                <input type="text" className="form-control" readOnly name="spend_account"
                                                       {...register("spend_account", {
                                                           required: true,
                                                       })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label><i className="icofont icofont-money mr-2"></i>Initial Balance (VND):</label>
                                                <input type="text" className="form-control digits number-separator" data-a-sign="" data-a-dec="." data-a-sep="," style={{fontFamily: 'Jost'}}
                                                       {...register("initial_balance", {
                                                           required: true,
                                                           value: "50,000"
                                                       })}
                                                />
                                                {errors?.initial_balance?.type === "required" &&
                                                    <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Initial balance is required!</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <SuccessModal info={info}/>
        </div>
    )
}

export default AddNewCustomer