import React, {useState, useEffect } from 'react'
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";
import axiosInstance from "../../../utils/axiosConfig.js";

function AddEmployeeTab(){
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    //prevent space in username
    const preventSpace = function (e) {
        if(e.code === 'Space') e.preventDefault()
    }

    const onSubmit = (data) => {
        if (data.password != data.confirmPassword){
            alert('Password does not match!')
            return
        } else {
            axiosInstance.post(`/admin/employee`, data).then((result)=>{
                if (result.data.isSuccess == true){
                    $("#btn-step-1").click()
                    reset()
                    alert(result.data.message)
                } else {
                    alert(result.data.message)
                }
            })
            .catch((err)=>{
                alert(err)
            })
        }
    }
    
    return (
        <div className="">
            <div className="row">
                <div className="col-lg-12" style={{fontFamily: "Jost"}}>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div id="wizard" className="wizard-4" >
                                <ul>
                                    <li>
                                        <a id="btn-step-1" href="#step-1">
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
                                            <input type="text" className="form-control" onKeyDown={preventSpace}
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
                            </div>
                        </form>
                </div>
            </div>
            <Helmet defer={false}>
                <script src="/src/assets/js/form-wizard/form-wizard-five.js"/>
                <script src="/src/assets/js/autoNumeric.js" />
                <script src="/src/assets/js/modal-animated.js"/>
            </Helmet>
        </div>
    )
}

export default AddEmployeeTab