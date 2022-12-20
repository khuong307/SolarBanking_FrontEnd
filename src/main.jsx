import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConnectedRouter } from 'react-router-redux'
//--------- Common Account Features -------------//
import LoginForm from "./components/common/LoginForm.jsx";
import ForgotPasswordEmailForm from "./components/common/ForgotPasswordEmailForm.jsx";
import ForgotPasswordOtpForm from "./components/common/ForgotPasswordOtpForm.jsx";
import ForgotPasswordMainForm from "./components/common/ForgotPasswordMainForm.jsx";

//--------- Employee Features -----------//
import AddNewCustomer from "./components/employee/addNewCustomer/addNewCustomer.jsx";
import ChargeMoney from "./components/employee/chargeMoney/chargeMoney.jsx";
import CustomerTransaction from "./components/employee/customerTransaction/customerTransaction.jsx";

//--------- Customer Features -----------//
import CardList from "./components/customer/cardList";
import Transfer from "./components/customer/transfer.jsx";
import Contacts from "./components/customer/contacts.jsx";
import DebtList from "./components/customer/debtList.jsx";

//--------- UI layout -----------//
import CustomerTemplate from "../template/customer_template";
import EmployeeTemplate from "../template/employee_template";
import { Provider } from "react-redux";
import store from "./components/redux/store.jsx";

import Dashboard from "./components/admin/dashboard.jsx";
import EmployeeList from "./components/admin/employeeList.jsx";
import AdminTemplate from "../template/admin_template";
import ConfirmTransfer from './components/customer/transfer/ConfirmTransfer.jsx';
import OtpTransfer from './components/customer/transfer/OtpTransfer.jsx';
import HistoryTransaction from "./components/customer/history_transaction/historyTransaction.jsx";

ReactDOM.createRoot(document.getElementById('solar-banking')).render(
        <Provider store={store}>
            <BrowserRouter history={history}>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/forgotPassword/email" element={<ForgotPasswordEmailForm />} />
                    <Route path="/forgotPassword/otp" element={<ForgotPasswordOtpForm />} />
                    <Route path="/forgotPassword/confirm" element={< ForgotPasswordMainForm />} />
                    {/*Customer Routes*/}
                    <Route path="customer" element={
                        <CustomerTemplate />
                    }>
                        <Route path="cardList" element={<CardList />} />
                        <Route path="transfer" element={<Transfer />}/>
                        {/* Customer transfer routes*/}
                        <Route path="transfer/confirm" element={<ConfirmTransfer />} />
                        <Route path="transfer/otp" element={<OtpTransfer />} />
                        {/* end */}
                        <Route path="debtList" element={<DebtList />} />
                        <Route path="contacts" element={<Contacts />} />
                        <Route path="transaction" element={<HistoryTransaction />} />
                       

                    </Route>
                    {/*Employee Routes*/}
                    <Route path="employee" element={
                        <EmployeeTemplate />
                    }>
                        <Route path="addNewCustomer" element={<AddNewCustomer />} />
                        <Route path="chargeMoney" element={<ChargeMoney />} />
                        <Route path="customerTransaction" element={<CustomerTransaction />} />
                    </Route>
                    {/*Admin Routes*/}
                    <Route path="admin" element={
                        <AdminTemplate />
                    }>
                        <Route path="employeeList" element={<EmployeeList />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
)