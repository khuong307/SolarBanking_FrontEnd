import React from "react";
function NotFound(){
    return (
       <div className="modal fade" id="notFoundModal" tabIndex="-1" role="dialog">
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
                                           <img className="img-fluid w-50 d-block" src="/src/assets/img/not_found.png" style={{marginLeft: "auto", marginRight: "auto"}}/>
                                           <div style={{textAlign: "center", fontSize: "15px"}}>
                                               <div>Account Number or Username is invalid!</div>
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
export default NotFound