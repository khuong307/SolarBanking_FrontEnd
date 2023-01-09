import React,{useState,useEffect} from "react";
import axiosInstance from '../../../utils/axiosConfig.js';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AutoComplete, Button, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    getRecipientListBySolarBankApi,
    getUserBankAccountApi, getValidTransactionApi,
    searchReceiverInter,
    searchReceiverIntra
} from "../../redux/reducer/transferReducer.jsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import {NumericFormat} from "react-number-format";

function createDebt(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const recipientsSolarBank = useSelector(state => state.transferReducer.recipientsSolarBank)
    const [isShowModal,setIsShowModal] = useState(false);
    const [recipientInfo,setRecipientInfo] = useState({});
    const [createSuccess,setCreateSuccess] = useState({
        isSuccess: false,
        message: ''
    })
    const { register, handleSubmit, formState: { errors }} = useForm();
    const userId = localStorage.solarBanking_userId;

    function handleGetInfoUser(value){
        const apiPath = `/banks/infoUser?account_number=${value}`;
        axiosInstance.get(apiPath)
            .then(function(res){
                if (res.data.isSuccess){
                    console.log(res.data.userInfo)
                    setRecipientInfo(res.data.userInfo);
                }
            })
            .catch((err)=>{
                console.log(err.message);
                setIsShowModal(true);
                setCreateSuccess({
                    isSuccess: false,
                    message: 'Can not find user info'
                });
            })
    }
    const handleModalOk = ()=>{
        setIsShowModal(false);
    }
    const handleModalCancel = ()=>{
        setIsShowModal(false);
    }
    const handleAcceptBtn = ()=>{
        if (createSuccess.isSuccess){
            navigate('/customer/debtList');
        }
        else{
            setIsShowModal(false);
        }
    }
    // const onSubmit = function (data){
    //     console.log(data);
    //     try {
    //         const apiPath = "/debtList";
    //         axiosInstance.post(apiPath,{
    //             user_id: parseInt(userId),
    //             debt_account_number: data.account_number,
    //             debt_amount: parseInt(data.amount),
    //             debt_message: data.message
    //         }).then(function(res){
    //             console.log(res);
    //             if (res.data.isSuccess === true){
    //                 setCreateSuccess({
    //                     isSuccess: true,
    //                     message: res.data.message
    //                 })
    //                 setIsShowModal(true);
    //             }
    //             else{
    //                 setCreateSuccess({
    //                     isSuccess: false,
    //                     message: res.data.message
    //                 })
    //                 setIsShowModal(true);
    //             }
    //         })
    //         .catch((err)=>{
    //             console.log(err.message)
    //         })
    //     }catch (err){
    //         console.log(err.message)
    //     }
    // };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            user_id: userId,
            debt_account_number: "",
            debt_amount: 0,
            debt_message: "",
        },
        validationSchema: Yup.object().shape({
            debt_amount: Yup.string().min(5, "Must be lowest 10000")
                .required("Required"),

            debt_account_number: Yup.string().max(15, "Maximum 15 digits")
                .required("Required").matches(/^[0-9]+$/, "Must be only digits"),
        }),
        onSubmit: values => {
            let debt_amount = values.debt_amount
            debt_amount = Number(debt_amount.replaceAll(",",""))
            if(debt_amount < 10000 || isNaN(debt_amount) || debt_amount > 30000000){
                alert("Amount of Money must be lowest 10.000 and maximum 30.000.000")
            }else{
                const data = {
                    user_id: parseInt(userId),
                    debt_account_number: values.debt_account_number,
                    debt_amount: debt_amount,
                    debt_message: values.debt_message,
                }
                console.log(data);
                const apiPath = "/debtList";
                axiosInstance.post(apiPath,data).then(function(res){
                    console.log(res);
                    if (res.data.isSuccess === true){
                        setCreateSuccess({
                            isSuccess: true,
                            message: res.data.message
                        })
                        setIsShowModal(true);
                    }
                    else{
                        setCreateSuccess({
                            isSuccess: false,
                            message: res.data.message
                        })
                        setIsShowModal(true);
                    }
                })
                .catch((err)=>{
                    setCreateSuccess({
                        isSuccess: false,
                        message: err.message
                    })
                    setIsShowModal(true);
                })
            }
        }
    })

    useEffect(()=>{
        dispatch(getRecipientListBySolarBankApi(userId))
    },[])

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
                            <form onSubmit={formik.handleSubmit} className="theme-form mega-form col-md-12">
                                <div className="form-group col-md-6">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Account Number <span style={{color:"red"}} className="required">(*)</span> </label>

                                    <AutoComplete
                                        options={recipientsSolarBank?.map((user) => {
                                            return { label: user.account_number + " - " + user.nick_name, value: user.account_number }
                                        })}
                                        name="debt_account_number"
                                        style={{ width: "100%", height: "100%", fontFamily: "Jost" }}
                                        onSelect={(value, option) => {
                                            handleGetInfoUser(value)
                                            formik.setFieldValue("debt_account_number",value)
                                        }}
                                        onChange={(data) => {
                                            formik.handleChange
                                            formik.setFieldValue("debt_account_number", data)
                                        }}
                                        placeholder="Account number"
                                    />
                                    {formik.errors.debt_account_number ? <div className='text-danger' style={{fontFamily: "Jost"}}>{formik.errors.des_account_number}</div> : null}
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Full name</label>
                                    <input className="form-control" readOnly={true} value={recipientInfo.full_name}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Email</label>
                                    <input className="form-control" readOnly={true} value={recipientInfo.email}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Phone</label>
                                    <input className="form-control" readOnly={true} value={recipientInfo.phone}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Amount <span style={{color:"red"}} className="required">(*)</span></label>
                                    <NumericFormat name='debt_amount' className='form-control' thousandSeparator="," onChange={formik.handleChange} />
                                    {formik.errors.debt_amount ? <div className='text-danger'>{formik.errors.debt_amount}</div> : null}
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Message</label>
                                    <textarea name='debt_message' rows={3} className="form-control" placeholder="Enter message"
                                              onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <button className="btn btnLogin" type="submit" onClick={formik.handleSubmit}>Submit</button>
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
                        <p className="modal-message">{createSuccess.message}</p>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default createDebt