import React,{useState,useEffect} from 'react';
import axiosInstance  from '../../utils/axiosConfig.js'
import TableDebtListSelf from "./debt/table_debt_list_self.jsx";
import TableDebtListOther from "./debt/table_debt_list_other.jsx";
import {useNavigate} from "react-router-dom";

function DebtList(){
    const navigate = useNavigate();
    const [debtList,setDebtList] = useState('');
    const [selfList,setSelfList] = useState('');
    const [otherList,setOtherList] = useState('');

    const handleCreateNewDebt = ()=>{
        navigate("create");
    }
    function  getDebtList (){
        const userId = localStorage.solarBanking_userId;
        let apiPath = `/debtList/${userId}/list`;
        axiosInstance.get(apiPath)
            .then((res) => {
                if(res.data.isSuccess === true){
                    setSelfList(res.data.self_debt_list);
                    setOtherList(res.data.other_debt_list);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(getDebtList,[]);
    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="title">
                            <h4>DEBT LIST</h4>
                            <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Debt List</small>
                        </div>
                        <div className="direction">
                            <div className="float-right mb-3">
                                <button className="btn btnLogin d-flex align-items-center align-content-center justify-content-center" onClick={handleCreateNewDebt} >
                                    <i className="fa fa-plus mr-2"></i>
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card height-equal mt-4" style={{fontFamily: "Jost"}}>
                        <div className="card-body">
                            <ul className="nav nav-pills nav-warning" id="top-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="top-home-tab" data-toggle="tab" href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                                        <i className="icofont icofont-user-alt-7" />Self Made</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-top-tab" data-toggle="tab" href="#top-profile" role="tab" aria-controls="top-profile" aria-selected="false">
                                        <i className="icofont icofont-users" />Other Made</a>
                                </li>
                            </ul>
                            <div className="tab-content mt-5" id="top-tabContent">
                                <div className="tab-pane fade show active" id="top-home" role="tabpanel" aria-labelledby="top-home-tab" style={{fontSize: "12px"}}>
                                    <TableDebtListSelf debtListSelf={selfList}/>
                                </div>
                                <div className="tab-pane fade" id="top-profile" role="tabpanel" aria-labelledby="profile-top-tab" style={{fontSize: "12px"}}>
                                    <TableDebtListOther debtListOther={otherList}/>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default DebtList
