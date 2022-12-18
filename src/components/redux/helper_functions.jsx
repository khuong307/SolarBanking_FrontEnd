import {useDispatch} from "react-redux";
import {changeByID} from "./counter.jsx";
import numeral from "numeral";
import moment from 'moment'


export default function setTabID(id){
    const dispatch = useDispatch()
    dispatch(changeByID(id))
}
export function formatMoney(value){
    return numeral(value).format('0,0')
}
export function formateDateTime(value){
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
}

export function ChargeBySLBToArray(data){
    return Object.values(j)
}