import {Helmet} from "react-helmet";
import React from "react";
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";

import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'
function TabelReceiveOthersList(props){
    function loadData(){
        if (typeof props.receiveOthersList == "object"){
            $("#receiveFromOthers").DataTable().rows().remove().draw();
            for (const c of props.receiveOthersList){
                const ans = []
                ans.push(formateDateTime(c.transaction_created_at).slice(0,10))
                ans.push(formateDateTime(c.transaction_created_at).slice(10,19))
                ans.push(c.des_account_number)
                ans.push(c.other_fullname)
                ans.push(c.other_bank_name)
                ans.push("+"+formatMoney(c.transaction_amount))
                ans.push(c.transaction_message)
                const tmp = $("#receiveFromOthers").DataTable().row.add(ans).draw(false).node()
                if (c.other_bank_name == "Solar Bank"){
                    $(tmp).attr('style', "color: black; background-color: #FFB800")
                }
            }
        }
    }
    setTimeout(loadData, 500)
    return(
        <div className="row">
            {
                typeof props.receiveOthersList == "object" &&
                    <div className="dt-ext table-responsive" style={{fontFamily: "Jost", fontSize: "13px"}}>
                        <table id="receiveFromOthers" className="display">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Sender Account</th>
                                <th>Sender</th>
                                <th>Sender Bank</th>
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
export default TabelReceiveOthersList