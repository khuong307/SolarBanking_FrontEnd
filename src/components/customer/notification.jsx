import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosConfig.js";
import moment from "moment/moment.js";
import {useDispatch, useSelector} from "react-redux";
import {updateIsSeen, updateAllIsSeen} from "../redux/notification.jsx";
import {useNavigate} from "react-router-dom";

function FullNotificationList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [allNotifications, setAllNotifications] = useState([]);
    const {notificationList} = useSelector(state => state.notification);

    useEffect(function() {
        const userId = localStorage.solarBanking_userId;
        axiosInstance.get(`/users/${userId}/notifications`)
            .then((res) => {
                setAllNotifications(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [notificationList]);

    const handleUnseenClicked = function(notification) {
        if (notification.is_seen === 0) {
            axiosInstance.put(`/users/notifications/${notification.notification_id}`)
                .then((res) => {
                    dispatch(updateIsSeen(notification.notification_id));
                    setAllNotifications(allNotifications.map(notificationElement => {
                        if (notificationElement.notification_id === notificationElement)
                            return {...notificationElement, is_seen: 1};
                        return notificationElement;
                    }));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        navigate(`/customer/debtList/details/${notification.debt_id}`);
    }

    const handleMarkAllAsReadClicked = function() {
        const unseenIdArray = [];

        allNotifications.forEach(notification => {
            if (notification.is_seen === 0)
                unseenIdArray.push(notification.notification_id);
        });

        axiosInstance.put('/users/notifications/all', {unseen_id_array: unseenIdArray})
            .then((res) => {
                dispatch(updateAllIsSeen());
                setAllNotifications(allNotifications.map(notification => {
                    if (notification.is_seen === 0)
                        return {...notification, is_seen: 1};
                    return notification;
                }));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>NOTIFICATION</h4>
                    <small className="main-small-description">Solar Banking Notification Panel</small>
                </div>
                <div className="col-lg-12 mt-2 d-flex justify-content-center" style={{fontFamily: "Jost"}}>
                    <div className="col-lg-10">
                        <div className="card mt-3">
                            <div className="card-body">
                                <div className="float-left">
                                    <h5><i className="fa fa-bell mr-2"></i>All Notifications</h5>
                                </div>
                                <div className="float-right">
                                    <button onClick={handleMarkAllAsReadClicked} className="btn btnLogin">
                                        <i className="fa fa-check mr-2"></i>
                                        Mark All As Read
                                    </button>
                                </div>
                                <hr className="mt-5"/>
                                <ul className="notification-wrapper" style={{fontFamily: "Jost"}}>
                                    {allNotifications.map((notification, notificationIdx) => (
                                        <div key={notification.notification_id}
                                             className={notification.is_seen === 0 ? "unseen-notification-bg" : "seen-notification-bg"}
                                             onClick={(e) => handleUnseenClicked(notification)}
                                        >
                                            <li className="mt-1" style={{borderRadius: "10px"}}>
                                                <div className="media">
                                                    <div className="media-body ml-2 mr-2" style={{borderRadius: "10px"}}>
                                                        <h6 className="mt-2 mb-1 notification-title">{notification.notification_title}</h6>
                                                        <p className="mb-0" style={{fontFamily: "Jost", fontSize: "14px"}}>{notification.notification_message}</p>
                                                        <span style={{fontFamily: "Jost", fontSize: "12px"}}><i className="icofont icofont-clock-time p-r-5"></i>{moment(notification.notification_created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <hr className="mb-0"/>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullNotificationList;