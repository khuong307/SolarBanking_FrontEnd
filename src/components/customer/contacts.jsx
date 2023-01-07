import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useForm} from 'react-hook-form';
import axiosInstance from '../../utils/axiosConfig.js';
import {Modal, Button, Select} from 'antd';
import ErrorMessage from '../common/ErrorMessage.jsx';
import {SOLAR_BANK_CODE} from '../../utils/constants.js';
import '/src/assets/css/datatables.css';
import '/src/assets/css/datatable-extension.css';
import '/src/assets/css/data-table.css';

function Contacts() {
    const userId = localStorage.solarBanking_userId;
    const {register, setValue, getValues, setError, handleSubmit, formState: { errors }} = useForm();
    const [isIntraBank, setIsIntraBank] = useState(true);
    const [connectedBank, setConnectedBank] = useState([]);
    const [contactList, setContactList] = useState([]);
    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState({
        isShow: false,
        userInfo: null
    });
    const [showEditModal, setShowEditModal] = useState({
        isShow: false,
        contact: null
    });
    const [showDeleteModal, setShowDeleteModal] = useState({
        isShow: false,
        account_number: null
    });
    const [addIntraBankFailed, setAddIntraBankFailed] = useState({
        isSuccess: true,
        message: ''
    });
    const [addInterBankFailed, setAddInterBankFailed] = useState({
        isSuccess: true,
        message: ''
    });

    const showAddModal = function() {
        setIsShowAddModal(true);
    };

    const handleAddModalOk = function() {
        setIsShowAddModal(false);
        setValue('intrabank_account_number', '');
        setValue('intrabank_nick_name', '');
        setValue('interbank_account_number', '');
        setValue('interbank_nick_name', '');
    };

    const handleAddModalCancel = function() {
        setIsShowAddModal(false);
        setValue('intrabank_account_number', '');
        setValue('intrabank_nick_name', '');
        setValue('interbank_account_number', '');
        setValue('interbank_nick_name', '');
    };

    const handleGetIntraBankContact = function(data) {
        const account_number = data.intrabank_account_number;

        if (account_number.length === 0) {
            setError('intrabank_account_number', { type: "required" });
        }
        else {
            axiosInstance.get(`/employee/customer/${account_number}`)
                .then((res) => {
                    if (res.status === 209) {
                        setAddIntraBankFailed({
                            isSuccess: false,
                            message: res.data.message
                        });
                    }
                    else if (res.status === 200) {
                        setShowConfirmModal({
                            isShow: true,
                            userInfo: res.data.customer_info
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const handleGetInterBankContact = async function(data) {
        const accountNumber = data.interbank_account_number;

        if (accountNumber.length === 0) {
            setError('interbank_account_number', { type: "required" });
            return;
        }

        axiosInstance.get(`/users/internal/info?account_number=${accountNumber}`)
            .then((res) => {
                setShowConfirmModal({
                    isShow: true,
                    userInfo: {
                        account_number: accountNumber,
                        full_name: res.data.user.name,
                        phone: res.data.user.phone,
                        username: res.data.user.username
                    }
                });
            })
            .catch((err) => {
                setAddInterBankFailed({
                    isSuccess: false,
                    message: err?.response?.data?.message || 'Get account info from connectivity bank failed!'
                });
            });
    }

    const changeAddIntraBankFailedToDefault = function() {
        setAddIntraBankFailed({
            isSuccess: true,
            message: ''
        });
    }

    const changeAddInterBankFailedToDefault = function() {
        setAddInterBankFailed({
            isSuccess: true,
            message: ''
        });
    }
    const handleConfirmModalOk = function() {
        setShowConfirmModal({
            isShow: false,
            userInfo: null
        });
    }

    const handleConfirmModalCancel = function() {
        setShowConfirmModal({
            isShow: false,
            userInfo: null
        });
    }

    const handleAddIntraBankContact = function() {
        const account_number = getValues('intrabank_account_number');
        const nick_name = getValues('intrabank_nick_name').length > 0 ? getValues('intrabank_nick_name') : null;

        axiosInstance.post(`/users/${userId}/recipients`, {account_number, nick_name})
            .then((res) => {
                const newContact = res.data.recipient;
                handleConfirmModalCancel();
                handleAddModalCancel();
                newContact.bank_name = 'Solar Bank';
                setContactList([...contactList, newContact]);
            })
            .catch((err) => {
                handleConfirmModalCancel();
                setAddIntraBankFailed({
                    isSuccess: false,
                    message: err.response.data.message
                });
            });
    }

    const handleAddInterBankContact = function() {
        const account_number = getValues('interbank_account_number');
        const nick_name = getValues('interbank_nick_name').length > 0 ? getValues('interbank_nick_name') : showConfirmModal.userInfo.username;
        console.log(showConfirmModal);
        const bank_code = "TXB";

        axiosInstance.post(`/users/${userId}/recipients`, {account_number, nick_name, bank_code})
            .then((res) => {
                const newContact = res.data.recipient;
                handleConfirmModalCancel();
                handleAddModalCancel();
                newContact.bank_name = 'TaiXiuBank';
                setContactList([...contactList, newContact]);
            })
            .catch((err) => {
                handleConfirmModalCancel();
                setAddInterBankFailed({
                    isSuccess: false,
                    message: err.response.data.message
                });
            });
    }

    const handleEditModalOk = function() {
        setShowEditModal({
            isShow: false,
            contact: null
        });
    };

    const handleEditModalCancel = function() {
        setShowEditModal({
            isShow: false,
            contact: null
        });
    };

    const handleEditContact = function() {
        axiosInstance.put(`/users/${userId}/recipients/${showEditModal.contact.account_number}`, {nick_name: showEditModal.contact.nick_name})
            .then((res => {
                setContactList(contactList.map(contact => {
                    return contact.account_number === res.data.accountNumber ? {...contact, nick_name: res.data.nick_name} : contact;
                }));
                handleEditModalCancel();
            }))
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDeleteModalOk = function() {
        setShowDeleteModal({
            isShow: false,
            account_number: null
        });
    };

    const handleDeleteModalCancel = function() {
        setShowDeleteModal({
            isShow: false,
            account_number: null
        });
    };

    const handleDeleteContact = function() {
        axiosInstance.delete(`/users/${userId}/recipients/${showDeleteModal.account_number}`)
            .then((res => {
                const tmp = []
                for (const c of contactList){
                    if (c.account_number !== showDeleteModal.account_number){
                        tmp.push(c)
                    }
                }
                setContactList(tmp)
                if (tmp.length === 0){
                    $("#table-contact-list").DataTable().rows().remove().draw(true);
                }
                // setContactList(contactList.filter(contact => contact.account_number !== showDeleteModal.account_number));
                handleDeleteModalCancel();
            }))
            .catch((err) => {
                console.log(err);
            });
    }

    const handleChangeNickname = function(e) {
        setShowEditModal({
            isShow: true,
            contact: {
                ...showEditModal.contact,
                nick_name: e.target.value
            }
        });
    }

    const hidePhoneNumber = function(phone) {
        return phone ? phone.substring(0, 3) + "#-###-#" + phone.substring(8) : null;
    }

    const handleIntraBankTabClicked = function() {
        setValue('intrabank_account_number', '');
        setValue('intrabank_nick_name', '');
        setIsIntraBank(true);
    }

    const handleInterBankTabClicked = function() {
        setValue('interbank_account_number', '');
        setValue('interbank_nick_name', '');
        setIsIntraBank(false);
    }

    useEffect(function() {
        axiosInstance.get(`/users/${userId}/recipients`)
            .then((res) => {
                setContactList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        axiosInstance.get('/banks')
            .then((res) => {
                const bankList = res.data.bankList;
                const result = [];

                bankList.forEach(bank => {
                    if (bank.bank_code !== SOLAR_BANK_CODE) {
                        const temp = {};
                        temp["value"] = bank.bank_code;
                        temp["label"] = bank.bank_name;
                        result.push(temp);
                    }
                });

                setConnectedBank(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(function() {
        const buttonComponent = `
            <div class="d-flex">
                <button class="btn btnEdit btn-edit">
                    <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btnDel ml-2 btn-delete">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `;

        if (Array.isArray(contactList)) {
            if (contactList.length > 0) {
                $("#table-contact-list").DataTable().rows().remove().draw();
                contactList.forEach((contact, contactIdx) => {
                    const ans = [];
                    ans.push(contactIdx + 1);
                    ans.push(contact.nick_name);
                    ans.push(contact.account_number);
                    ans.push(contact.bank_name);
                    ans.push(buttonComponent);
                    $("#table-contact-list").DataTable().row.add(ans).draw(false);
                });
            }
        }

        const editBtnArr = document.getElementsByClassName('btn-edit');
        const deleteBtnArr = document.getElementsByClassName('btn-delete');

        for (let i = 0; i < editBtnArr.length; i++)
            editBtnArr[i].addEventListener('click', function(e) {
                setShowEditModal({
                    isShow: true,
                    contact: contactList[i]
                });
            });

        for (let i = 0; i < deleteBtnArr.length; i++)
            deleteBtnArr[i].addEventListener('click', function(e) {
                setShowDeleteModal({
                    isShow: true,
                    account_number: contactList[i].account_number
                });
            });
    }, [contactList]);

    function createTableIfEmpty(){
        if (contactList.length === 0){
            $("#table-contact-list").DataTable();
        }
    }

    return (
        <div className="page-body" onLoad={createTableIfEmpty()}>
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>CONTACTS</h4>
                    <small className="main-small-description">Solar Banking Customer Contacts</small>
                    <div className="card">
                        <div className="card-body">
                            <div className="float-right mr-3 mb-3">
                                <button onClick={showAddModal} className="btn btnLogin">
                                    <i className="fa fa-plus-circle mr-2"></i>
                                    Add
                                </button>
                            </div>
                            <div className="dt-ext table-responsive" style={{fontSize: "13px"}}>
                                <table id="table-contact-list" className="display" style={{fontFamily: "Jost"}}>
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nick name</th>
                                        <th scope="col">Account number</th>
                                        <th scope="col">Bank</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <Modal title="Add Contact" style={{fontFamily: "Jost"}}
                                   centered
                                   open={isShowAddModal}
                                   onOk={handleAddModalOk}
                                   onCancel={handleAddModalCancel}
                                   footer={[
                                       <Button key="back" onClick={handleAddModalCancel} style={{fontFamily: "Jost"}}>
                                           Cancel
                                       </Button>,
                                       <Button
                                           key="submit"
                                           className="btnLogin"
                                           type="primary"
                                           onClick={isIntraBank ? handleSubmit(handleGetIntraBankContact) : handleSubmit(handleGetInterBankContact)}
                                           style={{fontFamily: "Jost"}}
                                       >
                                           Add
                                       </Button>,
                                   ]}
                            >
                                <ul className="nav nav-pills nav-warning" id="top-tab" role="tablist">
                                    <li onClick={handleIntraBankTabClicked} className="nav-item">
                                        <a className="nav-link active" id="top-home-tab" data-toggle="tab" href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                                            <i className="icofont icofont-contact-add" />Intra-bank contact</a>
                                    </li>
                                    <li onClick={handleInterBankTabClicked} className="nav-item">
                                        <a className="nav-link" id="profile-top-tab" data-toggle="tab" href="#top-profile" role="tab" aria-controls="top-profile" aria-selected="false">
                                            <i className="icofont icofont-contact-add" />Inter-bank contact</a>
                                    </li>
                                </ul>
                                <div className="tab-content mt-4" id="top-tabContent">
                                    <div className="tab-pane fade show active" id="top-home" role="tabpanel" aria-labelledby="top-home-tab">
                                        <div className="form-group d-flex align-items-center align-content-center">
                                            <i className="fa fa-address-card-o mr-3"></i>
                                            <input className="form-control" placeholder="Enter account number" type="text" style={{fontFamily: "Jost"}}
                                                   {...register("intrabank_account_number")}
                                            />
                                        </div>
                                        {errors?.intrabank_account_number?.type === "required" &&
                                            <p className="error-input"><i className="fa fa-warning mr-2"></i>Account number is required!</p>
                                        }
                                        <div className="form-group d-flex align-items-center align-content-center">
                                            <i className="fa fa-user mr-3 user-icon"></i>
                                            <input className="form-control" placeholder="Enter nick name" type="text" style={{fontFamily: "Jost"}}
                                                   {...register("intrabank_nick_name")}
                                            />
                                        </div>
                                        {!addIntraBankFailed.isSuccess &&
                                            <ErrorMessage error={addIntraBankFailed.message} resetState={changeAddIntraBankFailedToDefault} />}
                                    </div>
                                    <div className="tab-pane fade" id="top-profile" role="tabpanel" aria-labelledby="profile-top-tab">
                                        <div className="form-group d-flex align-items-center align-content-center">
                                            <i className="fa fa-university mr-3"></i>
                                            <Select
                                                showSearch
                                                className="interbank-select"
                                                placeholder="Select a bank"
                                                options={connectedBank}
                                                defaultValue={connectedBank.length > 0 ? connectedBank[0].label : ""}
                                            />
                                        </div>
                                        <div className="form-group d-flex align-items-center align-content-center">
                                            <i className="fa fa-address-card-o mr-3"></i>
                                            <input className="form-control" placeholder="Enter account number" type="text" style={{fontFamily: "Jost"}}
                                                   {...register("interbank_account_number")}
                                            />
                                        </div>
                                        {errors?.interbank_account_number?.type === "required" &&
                                            <p className="error-input"><i className="fa fa-warning mr-2"></i>Account number is required!</p>
                                        }
                                        <div className="form-group d-flex align-items-center align-content-center">
                                            <i className="fa fa-user mr-3 user-icon"></i>
                                            <input className="form-control" placeholder="Enter nick name" type="text" style={{fontFamily: "Jost"}}
                                                   {...register("interbank_nick_name")}
                                            />
                                        </div>
                                        {!addInterBankFailed.isSuccess &&
                                            <ErrorMessage error={addInterBankFailed.message} resetState={changeAddInterBankFailedToDefault} />}
                                    </div>
                                </div>
                            </Modal>
                            <Modal title="Confirm Contact"
                                   centered
                                   open={showConfirmModal.isShow}
                                   onOk={handleConfirmModalOk}
                                   onCancel={handleConfirmModalCancel}
                                   footer={[
                                       <Button key="back" onClick={handleConfirmModalCancel} style={{fontFamily: "Jost"}}>
                                           Cancel
                                       </Button>,
                                       <Button key="submit" className="btnLogin" type="primary" onClick={isIntraBank ? handleAddIntraBankContact : handleAddInterBankContact} style={{fontFamily: "Jost"}}>
                                           Confirm
                                       </Button>,
                                   ]}
                            >
                                <p className="modal-message">
                                    Is this the user you want to add?
                                    <ul>
                                        <li><b>Account number: </b>{showConfirmModal?.userInfo?.account_number}</li>
                                        <li><b>Owner name: </b>{showConfirmModal?.userInfo?.full_name}</li>
                                        <li><b>Phone: </b>{hidePhoneNumber(showConfirmModal?.userInfo?.phone)}</li>
                                    </ul>
                                </p>
                            </Modal>
                            <Modal title="Edit Contact" style={{fontFamily: "Jost"}}
                                   centered
                                   open={showEditModal.isShow}
                                   onOk={handleEditModalOk}
                                   onCancel={handleEditModalCancel}
                                   footer={[
                                       <Button key="back" onClick={handleEditModalCancel} style={{fontFamily: "Jost"}}>
                                           Cancel
                                       </Button>,
                                       <Button key="submit" className="btnLogin" style={{fontFamily: "Jost"}} type="primary" onClick={handleEditContact}>
                                           Change
                                       </Button>,
                                   ]}
                            >
                                <div className="form-group d-flex align-items-center align-content-center">
                                    <i className="fa fa-address-card-o mr-3"></i>
                                    <input className="form-control" type="text" value={showEditModal?.contact?.account_number} readOnly={true} style={{fontFamily: "Jost"}}/>
                                </div>
                                <div className="form-group d-flex align-items-center align-content-center">
                                    <i className="fa fa-university mr-3"></i>
                                    <input className="form-control" type="text" value={showEditModal?.contact?.bank_name} readOnly={true} style={{fontFamily: "Jost"}}/>
                                </div>
                                <div className="form-group d-flex align-items-center align-content-center">
                                    <i className="fa fa-user mr-3 user-icon"></i>
                                    <input onChange={handleChangeNickname} className="form-control" type="text" value={showEditModal?.contact?.nick_name} style={{fontFamily: "Jost"}} />
                                </div>
                            </Modal>
                            <Modal title="Delete Contact" style={{fontFamily: "Jost"}}
                                   centered
                                   open={showDeleteModal.isShow}
                                   onOk={handleDeleteModalOk}
                                   onCancel={handleDeleteModalCancel}
                                   footer={[
                                       <Button key="back" onClick={handleDeleteModalCancel} style={{fontFamily: "Jost"}}>
                                           Cancel
                                       </Button>,
                                       <Button key="submit" className="btnLogin" type="primary" onClick={handleDeleteContact} style={{fontFamily: "Jost"}}>
                                           Delete
                                       </Button>,
                                   ]}
                            >
                                <p className="modal-message">Do you want to remove account <b>{showDeleteModal.account_number}</b> from your contacts?</p>
                            </Modal>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;