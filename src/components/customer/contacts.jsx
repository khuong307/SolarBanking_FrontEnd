import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import axiosInstance from '../../utils/axiosConfig.js';
import { Modal, Button } from 'antd';
import '/src/assets/css/datatables.css';
import '/src/assets/css/datatable-extension.css';
import '/src/assets/css/data-table.css';

function Contacts() {
    const userId = localStorage.solarBanking_userId;
    const [contactList, setContactList] = useState([]);
    const [isShowAddModal, setIsShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState({
        isShow: false,
        contact: null
    });
    const [showDeleteModal, setShowDeleteModal] = useState({
        isShow: false,
        account_number: null
    });

    const showAddModal = function() {
        setIsShowAddModal(true);
    };

    const handleAddModalOk = function() {
        setIsShowAddModal(false);
    };

    const handleAddModalCancel = function() {
        setIsShowAddModal(false);
    };

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
                setContactList(contactList.filter(contact => contact.account_number !== showDeleteModal.account_number));
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

    useEffect(function() {
        axiosInstance.get(`/users/${userId}/recipients`)
            .then((res) => {
                setContactList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(function() {
        const buttonComponent = `
            <div class="d-flex">
                <button class="btn btn-info btn-edit">
                    <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btn-danger ml-2 btn-delete">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `;

        if (contactList.length !== 0) {
            $("#table-contact-list").DataTable().rows().remove().draw();
            contactList.forEach((contact, contactIdx) => {
                const ans = [];
                ans.push(contactIdx + 1);
                ans.push(contact.account_number);
                ans.push(contact.nick_name);
                ans.push(contact.bank_name);
                ans.push(buttonComponent);
                $("#table-contact-list").DataTable().row.add(ans).draw(false);
            });
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

    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>CONTACTS</h4>
                    <small className="main-small-description">Solar Banking Customer Contacts</small>

                    <div className="card-body">
                        <div className="float-right mr-3 mb-3">
                            <button onClick={showAddModal} className="btn btn-success">
                                <i className="fa fa-plus mr-2"></i>
                                Add
                            </button>
                        </div>
                        <table id="table-contact-list" className="table display" style={{fontFamily: "Jost"}}>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Account number</th>
                                <th scope="col">Nick name</th>
                                <th scope="col">Bank</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <Modal title="Add Contact" centered open={isShowAddModal} onOk={handleAddModalOk} onCancel={handleAddModalCancel}>
                            <ul className="nav nav-tabs border-tab" id="top-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="top-home-tab" data-toggle="tab" href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                                        <i className="icofont icofont-contact-add" />Internal contact</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-top-tab" data-toggle="tab" href="#top-profile" role="tab" aria-controls="top-profile" aria-selected="false">
                                        <i className="icofont icofont-contact-add" />External contact</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="top-tabContent">
                                <div className="tab-pane fade show active" id="top-home" role="tabpanel" aria-labelledby="top-home-tab">
                                    <div className="form-group d-flex align-items-center align-content-center">
                                        <i className="fa fa-address-card-o mr-3"></i>
                                        <input className="form-control" placeholder="Enter account number" type="text" />
                                    </div>
                                    <div className="form-group d-flex align-items-center align-content-center">
                                        <i className="fa fa-user mr-3 user-icon"></i>
                                        <input className="form-control" placeholder="Enter nick name" type="text" />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="top-profile" role="tabpanel" aria-labelledby="profile-top-tab">
                                    <p>Waiting... API</p>
                                </div>
                            </div>
                        </Modal>
                        <Modal title="Edit Contact"
                               centered
                               open={showEditModal.isShow}
                               onOk={handleEditModalOk}
                               onCancel={handleEditModalCancel}
                               footer={[
                                   <Button key="back" onClick={handleEditModalCancel}>
                                       Cancel
                                   </Button>,
                                   <Button key="submit" type="primary" onClick={handleEditContact}>
                                       Change
                                   </Button>,
                               ]}
                        >
                            <div className="form-group d-flex align-items-center align-content-center">
                                <i className="fa fa-address-card-o mr-3"></i>
                                <input className="form-control" type="text" value={showEditModal?.contact?.account_number} readOnly={true} />
                            </div>
                            <div className="form-group d-flex align-items-center align-content-center">
                                <i className="fa fa-university mr-3"></i>
                                <input className="form-control" type="text" value={showEditModal?.contact?.bank_name} readOnly={true} />
                            </div>
                            <div className="form-group d-flex align-items-center align-content-center">
                                <i className="fa fa-user mr-3 user-icon"></i>
                                <input onChange={handleChangeNickname} className="form-control" type="text" value={showEditModal?.contact?.nick_name} />
                            </div>
                        </Modal>
                        <Modal title="Delete Contact"
                               centered
                               open={showDeleteModal.isShow}
                               onOk={handleDeleteModalOk}
                               onCancel={handleDeleteModalCancel}
                               footer={[
                                   <Button key="back" onClick={handleDeleteModalCancel}>
                                       Cancel
                                   </Button>,
                                   <Button key="submit" type="primary" onClick={handleDeleteContact}>
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
    );
}

export default Contacts;