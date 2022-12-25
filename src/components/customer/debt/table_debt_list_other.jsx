import React,{useState,useEffect} from "react";
import numeral from "numeral";
import {Helmet} from "react-helmet";
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";

import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'

function TableDebtListOther(props){
    function loadData(){
        if (typeof props.debtList == "object"){
            $("#paidDebtOther").DataTable().rows().remove().draw();
            for (const c of props.debtList) {
                const ans = [];
                ans.push(c.id)
                ans.push(c.debt_account_number)
                ans.push(formatMoney(c.debt_amount) + " VND")
                ans.push(formateDateTime(c.debt_created_at))
                ans.push(c.debt_status)
                $("#paidDebtOther").DataTable().rows.add(ans).draw(false);
            }
        }
    }

    setTimeout(loadData,500)
    return (
        typeof props.debtList == "object" &&
        <div className="table-responsive">
            <table id="paidDebtOther" className="display">
                <thead>
                <tr>
                    <th>#</th>
                    <th>User Id</th>
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

export default TableDebtListOther