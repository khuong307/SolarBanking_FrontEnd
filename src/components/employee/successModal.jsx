function SuccessModal(props){
    return (
        <div className="modal fade" id="successModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="">
                    <button type="button" className="theme-close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><i className="fa fa-times-circle-o" style={{color: "#FFB800", fontSize: "30px"}}></i></span>
                    </button>
                    <div className="modal-body">
                        <div className="card">
                            <div className="animate-widget">
                                <div className="col-sm-12">
                                    <div className="custom-card mt-2">
                                        <div className="card-header">
                                            <img src="/src/assets/img/background.png" className="img-fluid" alt="Solar Banking"/>
                                        </div>
                                        <div className="card-profile">
                                            <img src="/src/assets/img/solar_logo.png" className="rounded-circle" alt=""/>
                                        </div>
                                        <div className="text-center profile-details text-uppercase" style={{fontFamily: "Jost", fontSize: "20px"}}>
                                           {props.info.full_name}
                                        </div>
                                        <div className="card-social mt-2 mb-4" style={{fontFamily: "Jost", fontSize: "12px"}}>
                                            <div><i className="fa fa-phone mr-1"></i> Contact No:  {props.info.phone}</div>
                                            <div><i className="fa fa-envelope mr-1 mb-2"></i> {props.info.email}</div>
                                            <div style={{color: "rgb(0, 10, 97)", fontSize: "15px"}}>
                                                <span style={{textDecoration: "underline"}}>Note:</span> <span>Login Information was sent to customer email. <i className="fa fa-check-circle-o"></i></span>
                                            </div>
                                        </div>
                                        <div className="card-footer row" style={{fontFamily: "Jost"}}>
                                            <div className="col-6 col-sm-6">
                                                <small>Account Number:</small>
                                                <p>{props.info.spend_account}</p>
                                            </div>
                                            <div className="col-6 col-sm-6">
                                                <small>Initial Balance:</small>
                                                <p>{props.info.initial_balance} VND</p>
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

export default SuccessModal