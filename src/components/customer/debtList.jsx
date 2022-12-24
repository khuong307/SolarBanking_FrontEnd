import React,{useState,useEffect} from 'react';
import axiosInstance  from '../../utils/axiosConfig.js'
import debtListDetail from "./debt/debtListDetail.jsx";
import DebtListDetail from "./debt/debtListDetail.jsx";

function DebtList(){
    const [debtList,setDebtList] = useState([]);
    const [isSelf,setIsSelf] = useState(true);

    useEffect(function (){
        const userId = localStorage.solarBanking_userId;
        const SELF_MADE_DEBT_API_ENDPOINT = '/selfMade';
        const OTHER_MADE_DEBT_API_ENDPOINT = '/otherMade';
        let apiPath = `/debtList/${userId}`;

        if (isSelf)
            apiPath += SELF_MADE_DEBT_API_ENDPOINT;
        else
            apiPath += OTHER_MADE_DEBT_API_ENDPOINT;

        axiosInstance.get(apiPath)
            .then((res) => {
                if(res.data.isSuccess){
                    setDebtList(res.data.list_debt);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },[isSelf]);

    const handleSelfMadeClicked = function (){
        setIsSelf(true);
    }
    const handleOtherMadeClicked = function (){
        setIsSelf(false);
    }

    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>DEBT LIST</h4>
                    <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Debt List</small>
                    <div className="card-body">
                        <ul className="nav nav-tabs border-tab" id="top-tab" role="tablist">
                            <li onClick={handleSelfMadeClicked} className="nav-item">
                                <a className="nav-link active" id="top-home-tab" data-toggle="tab" href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                                    <i className="icofont icofont-user-alt-7" />Self Made</a>
                            </li>
                            <li onClick={handleOtherMadeClicked} className="nav-item">
                                <a className="nav-link" id="profile-top-tab" data-toggle="tab" href="#top-profile" role="tab" aria-controls="top-profile" aria-selected="false">
                                    <i className="icofont icofont-users" />Other Made</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="top-tabContent">
                            <div className="tab-pane fade show active" id="top-home" role="tabpanel" aria-labelledby="top-home-tab">
                                <DebtListDetail debtList={{debtList}}/>
                            </div>
                            <div className="tab-pane fade" id="top-profile" role="tabpanel" aria-labelledby="profile-top-tab">
                                <DebtListDetail debtList={{debtList}}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default DebtList
