import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";

//--------- Common Account Features -------------//
import LoginForm from "./components/LoginForm.jsx";

//--------- Employee Features -----------//
import AddNewCustomer from "./components/employee/addNewCustomer.jsx";
import ChargeMoney from "./components/employee/chargeMoney.jsx";
import CustomerTransaction from "./components/employee/customerTransaction.jsx";

//--------- Customer Features -----------//
import CardList from "./components/customer/cardList";
import Transfer from "./components/customer/transfer.jsx";
import Contacts from "./components/customer/contacts.jsx";
import DebtList from "./components/customer/debtList.jsx";
import HistoryTransaction from "./components/customer/historyTransaction.jsx";

//--------- UI layout -----------//
import CustomerTemplate from "../template/customer_template";
import EmployeeTemplate from "../template/employee_template";
import { Provider } from "react-redux";
import store from "./components/redux/store.jsx";
import Dashboard from "./components/admin/dashboard.jsx";
import EmployeeList from "./components/admin/employeeList.jsx";
import AdminTemplate from "../template/admin_template";

ReactDOM.createRoot(document.getElementById('solar-banking')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes >
                    <Route path="account">
                        <Route path="login" element={<LoginForm />}>

                        </Route>
                    </Route>
                    {/*Customer Routes*/}
                    <Route path="customer" element={
                        <CustomerTemplate />
                    }>
                        <Route path="cardList" element={<CardList />} />
                        <Route path="transfer" element={<Transfer />} />
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
    </React.StrictMode>
)