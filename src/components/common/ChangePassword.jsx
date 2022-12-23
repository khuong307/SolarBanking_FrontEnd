import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage.jsx";
import axiosInstance from "../../utils/axiosConfig.js";

function ChangePassword() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [changeFailed, setChangeFailed] = useState({
        isSuccess: true,
        message: ''
    });

    const onSubmit = function(data) {
        const oldPassword = data.oldPassword;
        const newPassword = data.newPassword;
        const confirmPassword = data.confirmPassword;

        if (newPassword !== confirmPassword)
            setChangeFailed({
                isSuccess: false,
                message: 'The confirm password and new password do not match!'
            });
        else {
            const userId = localStorage.solarBanking_userId;
            axiosInstance.put(`/accounts/${userId}/password`, {
                old_password: oldPassword,
                new_password: newPassword
            })
            .then((res) => {
                alert(res.data.message);
                navigate('/customer');
            })
            .catch((err) => {
                setChangeFailed({
                    isSuccess: false,
                    message: err.response.data.message
                });
            });
        }
    }

    const changeChangeFailedToDefault = function() {
        setChangeFailed({
            isSuccess: true,
            message: ''
        });
    }

    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-6 mt-3 ml-3 change-password-wrapper">
                    <h4>CHANGE PASSWORD</h4>
                    <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mr-lg-5 form-group">
                            <label>Old password</label>
                            <input className="form-control change-password-input" placeholder="Enter old password" type="password"
                                   {...register("oldPassword", {
                                       required: true,
                                   })}
                            />
                        </div>
                        {errors?.oldPassword?.type === "required" &&
                            <p className="error-input"><i className="fa fa-warning mr-2"></i>Old password is required!</p>
                        }
                        <div className="mr-lg-5 form-group">
                            <label>New password</label>
                            <input className="form-control change-password-input" placeholder="Enter new password" type="password"
                                   {...register("newPassword", {
                                       required: true,
                                   })}
                            />
                        </div>
                        {errors?.newPassword?.type === "required" &&
                            <p className="error-input"><i className="fa fa-warning mr-2"></i>New password is required!</p>
                        }
                        <div className="mr-lg-5 form-group">
                            <label>Confirm password</label>
                            <input className="form-control change-password-input" placeholder="Enter confirm password" type="password"
                                   {...register("confirmPassword", {
                                       required: true,
                                   })}
                            />
                        </div>
                        {errors?.confirmPassword?.type === "required" &&
                            <p className="error-input"><i className="fa fa-warning mr-2"></i>Confirm password is required!</p>
                        }
                        {!changeFailed.isSuccess &&
                            <ErrorMessage error={changeFailed.message} resetState={changeChangeFailedToDefault} />}
                        <div className="d-flex mt-4">
                            <button className="btn change-password-submit-btn" type="submit">CHANGE</button>
                            <button className="btn ml-3 change-password-reset-btn" type="reset">RESET</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;