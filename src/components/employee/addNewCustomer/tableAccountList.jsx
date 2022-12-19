import {Helmet} from "react-helmet";
import React from "react";
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";

import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'
function TableAccountList(props){
    function loadData(){
        if (typeof props.accountList == "object"){
            $("#accountList").DataTable().rows().remove().draw();
            for (const c of props.accountList){
                const ans = []
                ans.push(c.full_name)
                ans.push(c.email)
                ans.push(c.phone)
                ans.push(c.username)
                ans.push(c.password)
                ans.push(formatMoney(c.initial_balance))
                $("#accountList").DataTable().row.add(ans).draw(false)
            }
        }
    }
    setTimeout(loadData, 500)
    return(
        <div className="container-fluid mt-4">
            {
                props.click && (
                    <div className="dt-ext table-responsive" style={{fontFamily: "Jost", fontSize: "13px"}}>
                            <table id="accountList" className="display">
                                <thead>
                                    <tr>
                                        <th>Fullname</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>Initial Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                        </table>
                        <Helmet>
                            <script src="/src/assets/js/datatables/jquery.dataTables.min.js"/>
                            <script src="/src/assets/js/datatable-extension/dataTables.buttons.min.js"/>
                            <script src="/src/assets/js/datatable-extension/dataTables.select.min.js"/>
                            <script src="/src/assets/js/datatable-extension/dataTables.bootstrap4.min.js"/>
                            <script src="/src/assets/js/datatable-extension/dataTables.responsive.min.js"/>
                            <script src="/src/assets/js/datatable-extension/dataTables.keyTable.min.js"/>
                            <script src="/src/assets/js/datatable-extension/custom.js"/>
                        </Helmet>
                    </div>
                )
            }
        </div>
    )
}
export default TableAccountList