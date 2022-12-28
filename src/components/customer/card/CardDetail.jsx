import numeral from 'numeral';
import { Helmet } from 'react-helmet';
import React from "react";
import '/src/assets/css/datatables.css';
import '/src/assets/css/datatable-extension.css';
import '/src/assets/css/data-table.css';

function CardDetail({ cardList, isSpend }) {
    if (!isSpend) {
        $(".table-card-list").DataTable().rows().remove().draw();
        cardList.forEach((card, cardIdx) => {
            const ans = [];
            ans.push(cardIdx + 1);
            ans.push(card.account_number);
            ans.push(numeral(card.balance).format('0,0'));
            $(".table-card-list").DataTable().row.add(ans).draw(false);
        });
    }

    return (
        <div className="dt-ext table-responsive">
            <table className="table-card-list display" id="transferByCustomer">
                <thead>
                <tr>
                    <th scope="col" style={{textAlign: "center"}}>STT</th>
                    <th scope="col" style={{textAlign: "center"}}>Account Number</th>
                    <th scope="col" style={{textAlign: "center"}}>Balance (VND)</th>
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
    );
}

export default CardDetail;