import { Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import ExamplesNavbar from "../Homepages/Components/Navbar";
import Card from "../Homepages/Components/Card";
import Message from "../Homepages/Components/Message";
import DefaultFooter from "../Homepages/Components/Footer";

function Homepages() {


    let menu = [
        { links: '/home/Login', options: 'Login' },
        { links: '/home/Register', options: 'Register' }
    ]

    const cbMenu = (nm) => {
        return (<Button key={nm.options} onClick={nm.options == 'Login' ? onOpen : setFlag.on} colorScheme="purple" variant="ghost" size="md" className="button"> <Link key={nm.options} to={nm.links}>{nm.options}</Link> </Button>)
    }
    return (
        <>
            <ExamplesNavbar val={["register", "login"]} />
            <Container className="d-flex flex-column wrapper">
                <Container className=" d-flex flex-column">
                    <h2 className="align-self-center title p-3">Who are we?</h2>
                    <h5 className="description p-3">
                        We are CryptoCoders, a small-business focused in looking for an innovative solution
                        for crypto wallets.
                    </h5>
                </Container>
                <Container className="d-flex flex-column justify-content-center align-items-center">
                    <h2 className="mb-3">The Cryptos we use!</h2>
                    <Container className="CryptoCurrencies">
                        <Row>
                            <Card title="USDT" cat="StableCoin">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, nostrum!
                            </Card>
                            <Card title="BUSD" cat="Stablecoin">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, sapiente.
                            </Card>
                            <Card title="SOL" cat="CryptoCurrency">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, dicta!
                            </Card>
                            <Card title="Another" cat="CryptoCurrency">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, dolores?
                            </Card>
                            <Card title="Another" cat="CryptoCurrency">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, dolores?
                            </Card>
                            <Card title="Another" cat="CryptoCurrency">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, dolores?
                            </Card>
                        </Row>
                    </Container>
                </Container>
                <div className="section section-contact-us text-center">
                    <Container className="d-flex flex-column">
                        <h2 className="title">How may I process a transaction with CryptoCoders?</h2>
                        <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, tempore!</p>
                        <Row className="p-5 align-self-center d-flex flex-column">
                            <Message />
                        </Row>
                    </Container>
                </div>
                <DefaultFooter />
            </Container>
        </>
    )
}

export default Homepages;