import {useDispatch, useSelector} from "react-redux";
import {setUpNotification, updateIsSeen, insertNotification} from "../redux/notification.jsx";
import {useEffect} from "react";
import axiosInstance from "../../utils/axiosConfig.js";
import {Link, useNavigate} from "react-router-dom";
import moment from "moment";
import io from 'socket.io-client';

const socket = io('http://localhost:3030');

function Notification() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = localStorage.solarBanking_userId;

    useEffect(function() {
        axiosInstance.get(`/users/${userId}/notifications?limit=5`)
            .then((res) => {
                dispatch(setUpNotification(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(function() {
        socket.on(`new-notification-${userId}`, (res) => {
            dispatch(insertNotification(res));
        });

        return () => socket.off(`new-notification-${userId}`);
    }, []);

    const handleUnseenClicked = function(notification) {
        if (notification.is_seen === 0) {
            axiosInstance.put(`/users/notifications/${notification.notification_id}`)
                .then((res) => {
                    dispatch(updateIsSeen(notification.notification_id));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        navigate(`/customer/debtList/details/${notification.debt_id}`);
    }

    const {notificationList} = useSelector(state => state.notification);
    const unseenNotification = notificationList.filter(notification => notification.is_seen === 0).length;

    return (
        <li className="onhover-dropdown">
            <Link className="txt-dark">
                <i className="fa fa-bell-o"></i>{unseenNotification !== 0 && <span className="badge badge-pill badge-primary notification">{unseenNotification}</span>}
            </Link>
            <ul className="notification-dropdown onhover-show-div notification-header-wrapper" style={{fontFamily: "Jost"}}>
                <li>5 Latest Notification <span
                    className="badge badge-pill badge-danger text-white text-uppercase pull-right" style={{fontFamily: "Jost"}}>{unseenNotification} New</span>
                </li>
                {notificationList.map(notification => (
                    <li className={notification.is_seen === 0 ? "unseen-notification-bg" : ""}
                        key={notification.notification_id}
                        onClick={(e) => handleUnseenClicked(notification)}
                    >
                        <div className="media">
                            <div className="media-body" style={{fontFamily: "Jost"}}>
                                <h6 className="mt-0 notification-title">{notification.notification_title}</h6>
                                <p className="mb-0" style={{fontFamily: "Jost"}}>{notification.notification_message}</p>
                                <span style={{fontFamily: "Jost"}}><i className="icofont icofont-clock-time p-r-5"></i>{moment(notification.notification_created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                            </div>
                        </div>
                    </li>
                ))}
                <li className="text-center">You have check <Link to="/customer/notification">all</Link> notification</li>
            </ul>
        </li>
    );
}

export default Notification;