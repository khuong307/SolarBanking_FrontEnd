import React, {useState, useEffect } from 'react'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import axiosInstance from "../../../utils/axiosConfig.js";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// import "/src/assets/css/scrollable.css"

function EditEmployeeTab(props){
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm()
    //prevent space in username
    const preventSpace = function (e) {
        if(e.code === 'Space') e.preventDefault()
    }
    const onSubmit = (data) => {
        if (data.password != data.confirmPassword){
            alert('Password does not match!')
            return
        } else {
            axiosInstance.patch(`/admin/employee/${props.info.user_id}`, data).then((result)=>{
                if (result.data.isSuccess == true){
                    alert(result.data.message)
                    props.clodeEditModal()
                    props.loadEmployeeList()
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
        <Modal show={props.editModal} onHide={props.clodeEditModal} >
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title >
                        <div style={{ fontSize: "20px"}} className="modalTitle">Edit Employee</div>
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body >
                <div className="col-sm-12 pl-0">
                    <div className="form-group m-t-15">
                        <label><i className="fa fa-user mr-2"></i>Fullname:</label>
                        <input type="text" className="form-control" placeholder="Solar Banking" defaultValue={props.info.full_name ? props.info.full_name: ""}
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
                        <input type="email" className="form-control" placeholder="name@example.com" defaultValue={props.info.email ? props.info.email: ""}
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
                        <input type="tel" className="form-control digits" id="contact" style={{fontFamily: "Jost"}} defaultValue={props.info.phone ? props.info.phone: ""}
                                placeholder="123456789"
                                {...register("phone", {
                                    required: true,
                                })}
                        />
                        {errors?.phone?.type === "required" &&
                            <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Phone number is required!</p>
                        }
                    </div>
                    <div className="form-group m-t-15">
                        <label><i className="fa fa-user mr-2"></i>Username:</label>
                        <input type="text" className="form-control"  value={props.info.username ? props.info.username: ""} readOnly={true}
                                placeholder="solar_banking2022"
                                {...register("username")}
                        />
                        {errors?.username?.type === "required" &&
                            <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Username is required!</p>
                        }
                    </div>
                    <div className="form-group">
                        <label><i className="fa fa-lock mr-2"></i>Password:</label>
                        <input type="password" className="form-control"
                                placeholder="Not required"
                                {...register("password")}
                        />
                        {errors?.username?.type === "required" &&
                            <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Password is required!</p>
                        }
                    </div>
                    <div className="form-group">
                        <label><i className="fa fa-lock mr-2"></i>Confirm Password:</label>
                        <input type="password" className="form-control" placeholder="Not required"
                                {...register("confirmPassword")}
                        />
                        {errors?.confirmPassword?.type === "required" &&
                            <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Confirm password is required!</p>
                        }
                    </div>
                </div>
                </Modal.Body>

                <Modal.Footer>
                    <button style={{fontFamily: "Jost"}} className="btn btn-light" onClick={props.clodeEditModal}>Cancel</button>
                    <button style={{fontFamily: "Jost"}} className="btn btnLogin"  type="submit" >Save</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default EditEmployeeTab