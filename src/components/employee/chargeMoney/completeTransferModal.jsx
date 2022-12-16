import numeral from "numeral";
function CompleteTransferModal(props){
    return (
        <div className="modal fade" id="completeTransferModal" tabIndex="-1" role="dialog">
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
                                           {props.transaction_info.customer_fullname}
                                        </div>
                                        <div className="card-social mt-2 mb-4" style={{fontFamily: "Jost", fontSize: "12px"}}>
                                            <div><i className="fa fa-envelope mr-1 mb-2"></i> {props.transaction_info.email}</div>
                                        </div>

                                        <textarea  row="3" cols="50" className="form-control textarea" style={{fontFamily: "Jost"}} readOnly value={props.transaction_info.transaction_message}/>
                                        <div className="card-footer row" style={{fontFamily: "Jost"}}>
                                            <div className="col-6 col-sm-6">
                                                <small>Account Number:</small>
                                                <p>{props.transaction_info.account_number}</p>
                                            </div>
                                            <div className="col-6 col-sm-6">
                                                <small>Balance:</small>
                                                <p>{numeral(props.transaction_info.new_balance).format('0,0')} VND</p>
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

export default CompleteTransferModal