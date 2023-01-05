import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import SetupInterceptors from "./utils/SetupInterceptors.js";
import { ConnectedRouter } from 'react-router-redux'
//--------- Common Account Features -------------//
import LoginForm from "./components/common/LoginForm.jsx";
import ForgotPasswordEmailForm from "./components/common/ForgotPasswordEmailForm.jsx";
import ForgotPasswordOtpForm from "./components/common/ForgotPasswordOtpForm.jsx";
import ForgotPasswordMainForm from "./components/common/ForgotPasswordMainForm.jsx";
import ChangePassword from "./components/common/ChangePassword.jsx";

//--------- Employee Features -----------//
import AddNewCustomer from "./components/employee/addNewCustomer/addNewCustomer.jsx";
import ChargeMoney from "./components/employee/chargeMoney/chargeMoney.jsx";
import CustomerTransaction from "./components/employee/customerTransaction/customerTransaction.jsx";

//--------- Customer Features -----------//
import CardList from "./components/customer/cardList";
import Transfer from "./components/customer/transfer.jsx";
import Contacts from "./components/customer/contacts.jsx";
import DebtList from "./components/customer/debtList.jsx";
import FullNotificationList from "./components/customer/notification.jsx";

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
import SuccessTransfer from './components/customer/transfer/SuccessTransfer.jsx';
import SaveTransaction from './components/customer/transfer/SaveTransaction.jsx';
import CreateDebt from "./components/customer/debt/createDebt.jsx";
import DebtDetail from "./components/customer/debt/debtDetail.jsx";
import Loading from './components/layout/Loading/Loading.jsx';

function NavigateFunctionComponent() {
    let navigate = useNavigate();
    const [ran, setRan] = useState(false);

    if (!ran) {
        SetupInterceptors(navigate);
        setRan(true);
    }
    return <></>;
}

ReactDOM.createRoot(document.getElementById('solar-banking')).render(
        <Provider store={store}>
            <BrowserRouter history={history}>
                <Loading/>
                {<NavigateFunctionComponent />}
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/forgotPassword/email" element={<ForgotPasswordEmailForm />} />
                    <Route path="/forgotPassword/otp" element={<ForgotPasswordOtpForm />} />
                    <Route path="/forgotPassword/confirm" element={< ForgotPasswordMainForm />} />

                    <Route path="account" element={
                        <RequiredAuth>
                            {localStorage.solarBanking_userRole === "Customer" ? (<CustomerTemplate />) :
                                (localStorage.solarBanking_userRole === "Employee" ? (<EmployeeTemplate />) : (<AdminTemplate />))
                            }
                        </RequiredAuth>
                    }>
                        <Route path="changePassword" element={<ChangePassword />} />
                    </Route>

                    {/*Customer Routes*/}
                    <Route path="customer" element={
                        <RequiredAuth>
                            <CustomerTemplate />
                        </RequiredAuth>
                    }>
                        <Route path="cardList" element={<CardList />} />
                        <Route path="transfer" element={<Transfer />}/>
                        {/* Customer transfer routes*/}
                        <Route path="transfer/confirm" element={<ConfirmTransfer />} />
                        <Route path="transfer/otp" element={<OtpTransfer />} />
                        <Route path="transfer/success" element={<SuccessTransfer />} />
                        <Route path='transfer/save' element={<SaveTransaction/>}/>
                        {/* end */}
                        <Route path="debtList" element={<DebtList />} />
                        <Route path="debtList/create" element={<CreateDebt />}/>
                        <Route path="debtList/details/:id" element={<DebtDetail />}/>
                        <Route path="contacts" element={<Contacts />} />
                        <Route path="transaction" element={<HistoryTransaction />} />
                        <Route path="notification" element={<FullNotificationList />} />

                    </Route>
                    {/*Employee Routes*/}
                    <Route path="employee" element={
                        <RequiredAuth>
                            <EmployeeTemplate />
                        </RequiredAuth>
                    }>
                        <Route path="addNewCustomer" element={<AddNewCustomer />} />
                        <Route path="chargeMoney" element={<ChargeMoney />} />
                        <Route path="customerTransaction" element={<CustomerTransaction />} />
                    </Route>
                    {/*Admin Routes*/}
                    <Route path="admin" element={
                        <RequiredAuth>
                            <AdminTemplate />
                        </RequiredAuth>
                    }>
                        <Route path="employeeList" element={<EmployeeList />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
);

function RequiredAuth({ children }) {
    const location = useLocation();

    if (!localStorage.solarBanking_accessToken || localStorage.solarBanking_accessToken === "undefined") {
        return <Navigate to='/' state={{ from: location }}/>
    }

    if (location.pathname.includes("/account")) {
        if (localStorage.solarBanking_userRole === "Customer")
            return <CustomerTemplate />;
        else if (localStorage.solarBanking_userRole === "Employee")
            return <EmployeeTemplate />;
        else if (localStorage.solarBanking_userRole === "Admin")
            return <AdminTemplate />;
    }

    if (localStorage.solarBanking_userRole === "Customer" && !location.pathname.includes("/customer")) {
        return <Navigate to='/' state={{ from: location }}/>
    }

    if (localStorage.solarBanking_userRole === "Employee" && !location.pathname.includes("/employee")) {
        return <Navigate to='/' state={{ from: location }}/>
    }

    if (localStorage.solarBanking_userRole === "Admin" && !location.pathname.includes("/admin")) {
        return <Navigate to='/' state={{ from: location }}/>
    }

    return children;
}