import numeral from 'numeral';

function CardDetail({ cardList }) {
    return (
        <table className="table table-striped" style={{fontFamily: "Jost"}}>
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Account number</th>
                <th scope="col">Balance</th>
            </tr>
            </thead>
            <tbody>
            {cardList.map((card, cardIdx) => (
                <tr key={cardIdx}>
                    <th scope="row">{cardIdx + 1}</th>
                    <td>{card.account_number}</td>
                    <td>{numeral(card.balance).format('0,0')}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default CardDetail;