import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosConfig.js";
import moment from "moment/moment.js";
import {useDispatch, useSelector} from "react-redux";
import {updateIsSeen, updateAllIsSeen} from "../redux/notification.jsx";

function FullNotificationList() {
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

    const handleUnseenClicked = function(notificationId) {
        axiosInstance.put(`/users/notifications/${notificationId}`)
            .then((res) => {
                dispatch(updateIsSeen(notificationId));
                setAllNotifications(allNotifications.map(notification => {
                    if (notification.notification_id === notificationId)
                        return {...notification, is_seen: 1};
                    return notification;
                }));
            })
            .catch((err) => {
                console.log(err);
            });
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
                    <small className="main-small-description">Solar Banking Notification</small>

                    <div className="card mt-3">
                        <div className="card-body">
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
                                         className={notification.is_seen === 0 ? "unseen-notification-bg" : ""}
                                         onClick={notification.is_seen === 0 ? (e) => handleUnseenClicked(notification.notification_id) : null}
                                    >
                                        <li>
                                            <div className="media">
                                                <div className="media-body">
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
    );
}

export default FullNotificationList;