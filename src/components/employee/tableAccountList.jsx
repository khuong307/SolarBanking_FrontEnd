import {Helmet} from "react-helmet";
import React from "react";
import {formatMoney} from "../redux/helper_functions.jsx";
function TableAccountList(props){
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
                            {
                            props.accountList.map(function (item) {
                                return (
                                    <tr>
                                        <td>{item.full_name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.username}</td>
                                        <td>{item.password}</td>
                                        <td>{formatMoney(item.initial_balance)} VND</td>
                                    </tr>

                                );
                            })
                        }
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
        </div>
    )
}
export default TableAccountList