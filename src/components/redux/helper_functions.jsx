import {useDispatch} from "react-redux";
import {changeByID} from "./counter.jsx";
import numeral from "numeral";

export default function setTabID(id){
    const dispatch = useDispatch()
    dispatch(changeByID(id))
}
export function formatMoney(value){
    return numeral(value).format('0,0')
}