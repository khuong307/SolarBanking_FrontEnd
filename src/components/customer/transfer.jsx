import React from 'react'
import { useNavigate } from 'react-router-dom'
function Transfer() {
    const navigate = useNavigate()
    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{ fontFamily: "Jost" }}>
                    <h4>TRANSFER</h4>
                    <small style={{ fontFamily: "Jost", fontSize: "15px", color: "gray" }}>Solar Banking Transfer Choice</small>

                    <div className='container-fluid'>
                        <div className='row'>
                            <div className="col-lg-6">
                                <div className="card o-hidden" style={{cursor:"pointer"}} onClick={()=>{
                                    navigate("internal")
                                }}>
                                    <div className="bg-info b-r-4 card-body">
                                        <div className="media static-top-widget">
                                            <div className="media-body text-center text-dark">
                                                <div>
                                                    <i className="fa-solid fa-building-columns fa-10x"></i>
                                                </div>
                                                <h3 style={{ fontFamily: "Jost" }} className="m-0">Internal Bank Transfer</h3>
                                                <i className="fa-solid fa-building-columns fa-10x icon-bg"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-6">
                                <div className="card o-hidden" style={{cursor:"pointer"}} onClick={()=>{
                                    navigate("interbank")
                                }}>
                                    <div className="bg-danger b-r-4 card-body">
                                        <div className="media static-top-widget">
                                            <div className="media-body text-center">
                                                <div>
                                                    <i className="fa-solid fa-money-bill-transfer fa-10x"></i>
                                                </div>
                                                <h3 style={{ fontFamily: "Jost" }} className="m-0">Interbank Transfer</h3>
                                                <i className="fa-solid fa-money-bill-transfer fa-10x icon-bg"></i>
                                            </div>
                                        </div>
                                    </div>
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
