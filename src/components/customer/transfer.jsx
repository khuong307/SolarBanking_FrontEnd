import React from 'react'
import { useNavigate } from 'react-router-dom'
import IntrabankTransfer from './transfer/IntrabankTransfer'
import InterbankTransfer from "./transfer/InterbankTransfer"

function Transfer() {
    const navigate = useNavigate()
    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{ fontFamily: "Jost" }}>
                    <h4>TRANSFER</h4>
                    <small style={{ fontFamily: "Jost", fontSize: "15px", color: "gray" }}>Solar Banking Transfer Choice</small>
                    <div className="card">
                        <div className="card-body">
                            <ul className="nav nav-pills nav-warning" id="top-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="top-home-tab" data-toggle="tab" style={{fontFamily:"Jost"}} href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                                        <i className="icofont icofont-ui-home" />Intra-Bank</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-top-tab" data-toggle="tab" style={{fontFamily:"Jost"}} href="#top-profile" role="tab" aria-controls="top-profile" aria-selected="false"><i className="icofont icofont-man-in-glasses" />Inter-Bank</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="top-tabContent">
                                <div className="tab-pane fade show active mt-2" id="top-home" role="tabpanel" aria-labelledby="top-home-tab">
                                    <IntrabankTransfer />
                                </div>
                                <div className="tab-pane fade mt-2" id="top-profile" role="tabpanel" aria-labelledby="profile-top-tab">
                                    <InterbankTransfer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Transfer
