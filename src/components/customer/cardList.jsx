import React, {useEffect, useState} from 'react';
import CardDetail from './card/CardDetail.jsx';
import axiosInstance from '../../utils/axiosConfig.js';

function CardList() {
    const [isSpend, setIsSpending] = useState(true);
    const [cardList, setCardList] = useState([]);

    useEffect(function() {
        const userId = localStorage.solarBanking_userId;
        const SPENDING_ACCOUNT_API_ENDPOINT = '/spendAccounts';
        const SAVING_ACCOUNT_API_ENDPOINT = '/savingAccounts';
        let apiPath = `/users/${userId}`;

        if (isSpend)
            apiPath += SPENDING_ACCOUNT_API_ENDPOINT;
        else
            apiPath += SAVING_ACCOUNT_API_ENDPOINT;

        axiosInstance.get(apiPath)
            .then((res) => {
                setCardList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isSpend]);

    const handleSpendingAccountClicked = function() {
        setIsSpending(true);
    }

    const handleSavingAccountClicked = function() {
        setIsSpending(false);
    }

    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>CARD LIST</h4>
                    <small className="main-small-description">Solar Banking Customer Cards</small>

                    <div className="card-body">
                        <ul className="nav nav-tabs border-tab" id="top-tab" role="tablist">
                            <li onClick={handleSpendingAccountClicked} className="nav-item">
                                <a className="nav-link active" id="top-home-tab" data-toggle="tab" href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                                    <i className="icofont icofont-bank" />Spending account</a>
                            </li>
                            <li onClick={handleSavingAccountClicked} className="nav-item">
                                <a className="nav-link" id="profile-top-tab" data-toggle="tab" href="#top-profile" role="tab" aria-controls="top-profile" aria-selected="false">
                                    <i className="icofont icofont-bank-alt" />Saving account</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="top-tabContent">
                            <div className="tab-pane fade show active" id="top-home" role="tabpanel" aria-labelledby="top-home-tab">

                            </div>
                            <div className="tab-pane fade" id="top-profile" role="tabpanel" aria-labelledby="profile-top-tab">
                                <CardDetail cardList={cardList} isSpend={isSpend} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardList;