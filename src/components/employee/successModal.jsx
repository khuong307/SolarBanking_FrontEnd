import '../../assets/js/modal-animated.js'
function SuccessModal(props){
    return (
        <div className="modal fade" id="successModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="">
                    <button type="button" className="close theme-close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <div className="modal-body">
                        <div className="card">
                            <div className="animate-widget">
                                <div className="col-sm-12">
                                    <div className="custom-card">
                                        <div className="card-header">
                                            <img src="/src/assets/img/background.png" className="img-fluid" alt="Solar Banking"/>
                                        </div>
                                        <div className="card-profile">
                                            <img src="/src/assets/img/solar_logo.png" className="rounded-circle" alt=""/>
                                        </div>
                                        <div className="text-center profile-details">
                                            <p style={{fontFamily: "Jost", fontSize: "20px"}} className="text-uppercase">{props.info.full_name}</p>
                                        </div>
                                        <ul className="card-social" style={{fontFamily: "Jost", fontSize: "12px"}}>
                                            <li><i className="fa fa-envelope"></i> {props.info.email}</li>
                                        </ul>
                                        <div className="card-footer row">
                                            <div className="col-4 col-sm-4" style={{fontFamily: "Jost"}}>
                                                <p>Account Number:</p>
                                                <p>{props.info.spend_account}</p>
                                            </div>
                                            <div className="col-4 col-sm-4">
                                                <h6>Following</h6>
                                                <h3><span className="counter">49</span>K</h3>
                                            </div>
                                            <div className="col-4 col-sm-4">
                                                <h6>Total Post</h6>
                                                <h3><span className="counter">96</span>M</h3>
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