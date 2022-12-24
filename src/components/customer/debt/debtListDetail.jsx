import React,{useState,useEffect} from "react";
import numeral from "numeral";
import {Helmet} from "react-helmet";
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";
import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'
function DebtListDetail(props){
    function loadData(){
        if (typeof props.debtList == "object"){
            $("#paidDebt").DataTable().rows().remove().draw();
            for (const debt of props.debtList) {
                const ans = [];
                ans.push(debt.id)
                ans.push(debt.debt_account_number)
                ans.push(formatMoney(debt.debt_amount) + " VND")
                ans.push(formateDateTime(debt.debt_created_at))
                ans.push(debt.debt_status)
                $("#paidDebt").DataTable().rows.add(ans).draw(false);
            }
        }
    }

    setTimeout(loadData(),500)
    return (
        typeof props.debtList == "object" &&
        <div className="table-responsive">
            <table id="paidDebt" className="display">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Account Number</th>
                    <th>Amount</th>
                    <th>Create Date</th>
                    <th>Status</th>
                    <th></th>
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

    )
}

export default DebtListDetail