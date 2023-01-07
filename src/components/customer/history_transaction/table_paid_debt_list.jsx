import {Helmet} from "react-helmet";
import React from "react";
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";

import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'
function TablePaidDebtList(props){
    function loadData(){
        if (typeof props.paidDebtList == "object"){
            $("#paidDebt").DataTable().rows().remove().draw();
            for (const c of props.paidDebtList){
                const ans = []
                ans.push(formateDateTime(c.transaction_created_at).slice(0,10))
                ans.push(formateDateTime(c.transaction_created_at).slice(10,19))
                ans.push(c.des_account_number)
                ans.push(c.other_fullname)
                ans.push(c.other_bank_name)
                ans.push("- "+formatMoney(c.transaction_amount))
                ans.push(c.transaction_message)
                $("#paidDebt").DataTable().row.add(ans).draw(false)
            }
        }
    }
    setTimeout(loadData, 500)
    return(
        <div className="row">
            {
                typeof props.paidDebtList == "object" &&
                    <div className="dt-ext table-responsive card-body" style={{fontFamily: "Jost", fontSize: "13px"}}>
                        <table id="paidDebt" className="display">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Receiver Account</th>
                                <th>Receiver Fullname</th>
                                <th>Receiver Bank</th>
                                <th>Amount (VND)</th>
                                <th>Message</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <Helmet>
                            <script src="/src/assets/js/datatables/jquery.dataTables.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.buttons.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/buttons.colVis.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/jszip.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/pdfmake.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/vfs_fonts.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.autoFill.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.select.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/buttons.print.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/buttons.html5.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.bootstrap4.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.responsive.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/responsive.bootstrap4.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.keyTable.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/custom.js"></script>
                        </Helmet>
                    </div>
            }
        </div>
    )
}
export default TablePaidDebtList