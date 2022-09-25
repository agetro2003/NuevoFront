import { Col, Button } from "reactstrap"




export default function Card({ title, cat, children }) {

    const route = "../../../../Public/assets";
    const imgSrc = title=="USDT"?`${route}/tether.png`:title=="BTC"?`${route}/btc.png`:title=="SOL"?`${route}/Solana.png`:`${route}/binance.png`;
    return (
        <>
            <Col md="3" key={title} className="card me-3 mb-3">
                <div className="d-flex flex-column alert newcard">
                    <h4 className="align-self-center">{title}<img className="ps-2" style={{maxWidth:"3vw"}} src={imgSrc} ></img></h4>
                    <p className="category text-info">{cat}</p>
                    <p>
                        {children}
                    </p>
                    <Button
                        className="btn-icon btn-round"
                        color="info"
                        onClick={(e) => e.preventDefault()}
                    >
                        Buy {title}!
                    </Button>
                </div>
            </Col>
        </>
    )
}