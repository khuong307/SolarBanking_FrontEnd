import React, {useEffect, useState} from 'react';
import CardDetail from './card/CardDetail.jsx';
import axiosInstance from '../../utils/axiosConfig.js';
import {formatMoney} from "../redux/helper_functions";
import {useDispatch} from "react-redux";
import {changeByID} from "../redux/counter.jsx";
import {Button, Modal} from "antd";

function CardList() {
    const dispatch = useDispatch();
    dispatch(changeByID(1));

    const [isSpend, setIsSpending] = useState(true);
    const [cardList, setCardList] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [userInfo, setUserInfo]= useState('');

    useEffect(function() {
        const userId = localStorage.solarBanking_userId;
        const SPENDING_ACCOUNT_API_ENDPOINT = '/spendAccounts';
        const SAVING_ACCOUNT_API_ENDPOINT = '/savingAccounts';
        let apiPath = `/users/${userId}`;

        if (isSpend)
            apiPath += SPENDING_ACCOUNT_API_ENDPOINT;
        else
            apiPath += SAVING_ACCOUNT_API_ENDPOINT;

        axiosInstance.get(apiPath)
            .then((res) => {
                setCardList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isSpend]);

    useEffect(function() {
        const username = localStorage.solarBanking_username
        let apiPath = `/employee/customer/${username}`;

        axiosInstance.get(apiPath)
            .then((res) => {
                setUserInfo(res.data.customer_info)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSpendingAccountClicked = function() {
        setIsSpending(true);
    }

    const handleSavingAccountClicked = function() {
        setIsSpending(false);
    }

    const handleModalOpen = function() {
        setIsShowModal(true);
    }

    const handleModalCancel = function() {
        setIsShowModal(false);
    }

    const handleModalOk = function() {
        const userId = localStorage.solarBanking_userId;

        if (userInfo.isLock) {
            axiosInstance.post(`/users/${userId}/spendingAccounts/unlock`)
                .then((res) => {
                    setIsShowModal(false);
                    setUserInfo({...userInfo, isLock: false});
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            axiosInstance.post(`/users/${userId}/spendingAccounts/lock`)
                .then((res) => {
                    setIsShowModal(false);
                    setUserInfo({...userInfo, isLock: true});
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>CARD LIST</h4>
                    <small className="main-small-description">Solar Banking Customer Cards</small>
                    <div className="card">
                        <div className="card-body">
                            <ul className="nav nav-pills nav-warning" id="top-tab" role="tablist">
                                <li onClick={handleSpendingAccountClicked} className="nav-item">
                                    <a className="nav-link active" id="top-home-tab" data-toggle="tab" href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                                        <i className="icofont icofont-bank" />Spending account</a>
                                </li>
                                <li onClick={handleSavingAccountClicked} className="nav-item">
                                    <a className="nav-link" id="profile-top-tab" data-toggle="tab" href="#top-profile" role="tab" aria-controls="top-profile" aria-selected="false">
                                        <i className="icofont icofont-bank-alt" />Saving account</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="top-tabContent">
                                <div className="tab-pane fade show active mt-3" id="top-home" role="tabpanel" aria-labelledby="top-home-tab">
                                    <div className="col-lg-12 d-flex justify-content-between align-items-center align-content-center">
                                        <div className="col-lg-7">
                                            <div style={{ position: "relative"}}>
                                                <div style={{bottom: "60%", right: "15%", position: "absolute", color: "#FFBA33", fontSize: "20px"}}>
                                                    {userInfo.account_number}
                                                </div>
                                                <div style={{bottom: "6%", right: "15%", position: "absolute", color: "#FFBA33"}}>
                                                    Balance: {formatMoney(userInfo.balance)} VND
                                                </div>
                                                <img className="img-fluid" style={{maxWidth: "95%", maxHeight: "75%", borderRadius: "15px",}} src="/src/assets/img/spend_account.png"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="text-center mb-2">
                                                CUSTOMER INFORMATION
                                            </div>
                                            <div>
                                                <p><i className="fa fa-user mr-1"></i>: {userInfo.full_name} || Username: {localStorage.getItem("solarBanking_username")}</p>
                                                <p><i className="fa fa-phone mr-1"></i>: {userInfo.phone}</p>
                                                <p><i className="fa fa-envelope mr-1"></i>: {userInfo.email}</p>
                                            </div>
                                            <div className="col-lg-12 mt-4 d-flex justify-content-center" >
                                                <button onClick={handleModalOpen} className="btn btnLogin2 d-flex justify-content-center align-content-center align-items-center" style={{fontFamily: "Jost"}}>
                                                    <i className={userInfo.isLock ? "fa fa-unlock mr-1" : "fa fa-lock mr-1"}></i>
                                                    {userInfo.isLock ? "Unlock Account" : "Lock Account"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade mt-5" id="top-profile" role="tabpanel" aria-labelledby="profile-top-tab" style={{fontFamily: "Jost", fontSize: "13px"}}>
                                    <CardDetail cardList={cardList} isSpend={isSpend} />
                                </div>
                                <Modal title={userInfo.isLock ? "Unlock Account" : "Lock Account"} style={{fontFamily: "Jost"}}
                                       centered
                                       open={isShowModal}
                                       onOk={handleModalOk}
                                       onCancel={handleModalCancel}
                                       footer={[
                                           <Button key="back" onClick={handleModalCancel} style={{fontFamily: "Jost"}}>
                                               Cancel
                                           </Button>,
                                           <Button key="submit" className="btnLogin" type="primary" onClick={handleModalOk} style={{fontFamily: "Jost"}}>
                                               {userInfo.isLock ? "Unlock" : "Lock"}
                                           </Button>,
                                       ]}
                                >
                                    <p className="modal-message">
                                        {userInfo.isLock ?
                                            "If you unlock this account, you can receive or send money. Do you want to unlock?" :
                                            "If you lock this account, you can not receive or send money. Do you want to lock?"
                                        }
                                    </p>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardList;