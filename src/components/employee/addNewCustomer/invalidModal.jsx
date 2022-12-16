function InvalidModal(props){
    return (
        <div className="modal fade" id="invalidModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="">
                    <button type="button" className="theme-close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><i className="fa fa-times-circle-o" style={{color: "#FFB800", fontSize: "30px"}}></i></span>
                    </button>
                    <div className="modal-body">
                        <div className="card">
                            <div className="animate-widget">
                                <div className="col-sm-12">
                                    <div className="custom-card" style={{fontFamily: "Jost"}}>
                                        <div className="text-center" style={{color: "#FFB800", fontSize:"20px"}}><b>INVALID INFORMATION</b></div>
                                        <img className="img-fluid w-50 d-block" src="/src/assets/img/invalid_icon.png" style={{marginLeft: "auto", marginRight: "auto"}}/>
                                        <div className="mt-1 mb-2 text-center" style={{fontSize: "15px"}}>
                                            <div><i className="fa fa-envelope mr-1"></i> :{props.info.email}</div>
                                            <div><i className="fa fa-user mr-1"></i>: {props.info.username}</div>
                                        </div>
                                        <div style={{textAlign: "center", fontSize: "15px"}}>
                                            <div>One of these information has already been used before! </div>
                                            <div style={{color: "#FFB800"}}><i className="fa fa-warning" ></i> Please change!</div>
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

export default InvalidModal