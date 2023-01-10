import {Helmet} from "react-helmet";
import React from "react";
import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'
import {formatMoney} from "../../redux/helper_functions";
function TableTransactionList(props){

    function loadData(){
        if (typeof props.transactionList == "object"){
            $("#transactionTable").DataTable()
            $("#transactionTable").DataTable().rows().remove().draw();
            for (const c of props.transactionList){
                const ans = []
                ans.push(c.transaction_id)
                ans.push(c.src_account_number)
                ans.push(c.src_bank_name)
                ans.push(c.des_account_number)
                ans.push(c.des_bank_name)
                ans.push(formatMoney(c.transaction_amount))
                ans.push(new Date(c.transaction_created_at).toLocaleString())
                ans.push(c.transaction_type_name[0].toUpperCase() + c.transaction_type_name.slice(1))
                $("#transactionTable").DataTable().row.add(ans).draw(false)
            }
        }
    }

    setTimeout(loadData, 200)

    return(
        <div className="row">
            {
                typeof props.transactionList == "object" &&
                    <div className="dt-ext table-responsive card-body" style={{fontFamily: "Jost", fontSize: "13px"}}>
                        <table id="transactionTable" style={{width: "100%"}} className="display">
                            <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Sender Number</th>
                                <th>Sender Bank</th>
                                <th>Receiver Number</th>
                                <th>Receiver Bank</th>
                                <th>Amount (VND)</th>
                                <th>Created Date</th>
                                <th>Transaction Type</th>
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
export default TableTransactionList