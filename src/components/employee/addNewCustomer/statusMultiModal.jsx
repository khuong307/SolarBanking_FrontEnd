import {Helmet} from "react-helmet";
import React from "react";
import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";

function StatusMultiModal(props){

    function loadData(){
        if (typeof props.success == "object"){
            $("#successList").DataTable().rows().remove().draw();
            for (const c of props.success){
                const ans = []
                ans.push(c.email)
                ans.push(c.username)
                $("#successList").DataTable().row.add(ans).draw(false)
            }
        }
        if (typeof props.fail == "object"){
            $("#failList").DataTable().rows().remove().draw();
            for (const c of props.fail){
                const ans = []
                ans.push(c.email)
                ans.push(c.username)
                $("#failList").DataTable().row.add(ans).draw(false)
            }
        }
    }
    setTimeout(loadData, 500)
    return (
        <div id="statusMultiModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="statusMultiModal" style={{fontFamily: "Jost"}}
             aria-hidden="true">
            <div className="modal-dialog" style={{maxWidth: "50%"}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title" id="statusMultiModalLabel">IMPORT CUSTOMERS WITH .CSV</div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i className="fa fa-times-circle-o" style={{color: "rgb(0, 10, 97)", fontSize: "30px"}}></i></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <img className="img-fluid rounded-circle img-50 d-block" src="/src/assets/img/solar_logo.png" style={{marginLeft: "auto", marginRight: "auto"}}/>
                            <div className="text-center">
                                STATUS PROCESS
                            </div>
                            <ul className="nav nav-pills nav-warning" id="top-tab" role="tablist" >
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" style={{fontSize: "14px"}}
                                       href="#top-success" role="tab" aria-controls="top-home" aria-selected="true">
                                        <i className="fa fa-check-circle-o"></i>Success</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" style={{fontSize: "14px"}}
                                       href="#top-fail" role="tab" aria-controls="top-profile"
                                       aria-selected="false"><i className="fa fa-times-circle-o"></i>Invalid</a>
                                </li>
                            </ul>
                            <div className="tab-content mt-3">
                                <div className="tab-pane fade show active" id="top-success" role="tabpanel" aria-labelledby="top-home-tab">
                                    <div className="vertical-scroll scroll-demo" >
                                        {
                                            props.isSuccess && (
                                                <div className="dt-ext table-responsive" style={{fontFamily: "Jost", fontSize: "12px"}}>
                                                    <table id="successList" className="display">
                                                        <thead>
                                                        <tr>
                                                            <th>Email</th>
                                                            <th>Username</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )
                                        }
                                        <div className="mt-2" style={{color: "rgb(0, 10, 97)", fontSize: "15px", textAlign: "center"}}>
                                            <span style={{textDecoration: "underline"}}>Note:</span> <span>With successful process, login information was sent to customer's email.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="top-fail" role="tabpanel" aria-labelledby="profile-top-tab">
                                    <div className="vertical-scroll scroll-demo">
                                        {
                                            props.isFail && (
                                                <div className="dt-ext table-responsive" style={{fontFamily: "Jost", fontSize: "12px"}}>
                                                    <table id="failList" className="display">
                                                        <thead>
                                                        <tr>
                                                            <th>Email</th>
                                                            <th>Username</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                    <Helmet>
                                                        <script src="/src/assets/js/datatables/jquery.dataTables.min.js"/>
                                                        <script src="/src/assets/js/datatable-extension/dataTables.select.min.js"/>
                                                        <script src="/src/assets/js/datatable-extension/dataTables.bootstrap4.min.js"/>
                                                        <script src="/src/assets/js/datatable-extension/dataTables.responsive.min.js"/>
                                                        <script src="/src/assets/js/datatable-extension/dataTables.keyTable.min.js"/>
                                                        <script src="/src/assets/js/success_fail_table.js"/>
                                                        <script src="/src/assets/js/scrollable/scrollable-custom.js"/>
                                                    </Helmet>
                                                </div>
                                            )
                                        }
                                        <div className="mt-2" style={{color: "#FFB800", fontSize: "15px", textAlign: "center"}}>
                                            <span style={{textDecoration: "underline"}}>Note:</span> <span><i className="fa fa-warning mr-1"></i>Invalid process in case username or email has already been used!</span>
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

export default StatusMultiModal