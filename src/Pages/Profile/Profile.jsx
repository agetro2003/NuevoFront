import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Card, Container, Button, CardTitle, CardBody } from "reactstrap";
import endpointList from "../../../settings/endpoints";
import API_AXIOS from "../../../settings/settings";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ProtectedRoute from "../../ProtectedRoute";
import ExamplesNavbar from "../Homepages/Components/Navbar";
import Balance from "./Components/Balance";
import DepositHistory from "./Components/DepositHistory";
import PaymentHistory from "./Components/PaymentHistory";


export default function Profile() {
    const [paymentFlag, setPaymentFlag] = useState(false);
    const [depositFlag, setDepositFlag] = useState(false);
    const [balanceFlag, setBalanceFlag] = useState(false);

    const navigate = useNavigate();

    let [email, setEmail] = (useState(window.localStorage.getItem("userEmailHP")))

    // let [userLogin, setUserLogin] = useLocalStorage('user', "")
    // datos personales
    // balance
    // historial de pagos
    // historial de depositos

    const cbMenu = (nm) => {
        const handleClick = () => {
            nm.opt == 'ph' ? setPaymentFlag(true) :
                nm.opt == 'dh' ? setDepositFlag(true) :
                    nm.opt == 'pr' ? setBalanceFlag(true) : "";
            navigate(nm.links)
        }
        return (<Button color="info" className="btn-menu mb-4 p-3 text-light" key={nm.options} onClick={handleClick} size="lg">{nm.options}</Button>)
    }

    // useEffect(() => {
    //     let date = new Date()
    //     setUserLogin(date);

    //     // console.log(balance)

    // }, [])

    let menu = [

        { links: '/profile/paymenthistory', options: "Payments' history", opt: "ph" },
        { links: '/profile/deposithistory', options: "Deposits' history", opt: "dh" },
        { links: '/profile/balance', options: "Users' balance", opt: "pr" },
        { links: '/menu', options: "Return to menu" }

    ]

    return (
        <>
            <ExamplesNavbar env="pro" />
            <Container className="d-flex  profmar flex-column align-items-center justify-content-center">
                <Container className="mt-5">
                    <h1 className="text-center text-decoration-underline mb-4">Menu</h1>
                    {/* <h3> Email: {email} </h3> */}
                    <Container className="d-flex flex-column justify-content-evenly mb-3">
                        {menu.map(cbMenu)}
                    </Container>
                    <Container>
                        <Routes>
                            <Route element={<ProtectedRoute />}> 
                            <Route path='/paymenthistory' element={<PaymentHistory val={{ paymentFlag, setPaymentFlag }} from="profile" />} />
                            </Route> 
                            <Route element={<ProtectedRoute />}>
                                <Route path="/deposithistory" element={<DepositHistory val={{ depositFlag, setDepositFlag }} />} />
                            </Route>
                            <Route element={<ProtectedRoute />}>
                                <Route path="/balance" element={<Balance val={{ balanceFlag, setBalanceFlag }} />} />
                            </Route>
                        </Routes>
                    </Container>
                </Container>
            </Container>
        </>
    )
}