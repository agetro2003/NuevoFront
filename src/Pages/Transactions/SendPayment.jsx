import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { Route, Routes, useNavigate } from "react-router-dom";
import { sendPaymentSchema } from "../../Utils/yupSchemas";
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../settings/endpoints";
import { Container, Form, Label, Input, FormGroup, FormFeedback, Button, Spinner } from "reactstrap";
import ExamplesNavbar from "../Homepages/Components/Navbar";
import ProtectedRoute from "../../ProtectedRoute";
import PaymentHistory from "../Profile/Components/PaymentHistory";
import Balance from "../Profile/Components/Balance";
import { pepito } from "../../Utils/pepito";

function SendPayment() {
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(sendPaymentSchema),
    });

    const navigate = useNavigate();

    const [spinner, setSpinner] = useState(false);

    const [paymentFlag, setPaymentFlag] = useState(false);
    const [balanceFlag, setBalanceFlag] = useState(false);

    let [switchbtn, setSwitchBtn] = useState(true);

    let [placeholder, setPlaceholder] = useState("Add receiver email");

    const currencies = ["usdt", "btc", "eth", "busd"];

    const fnSend = (data) => {
        setSpinner(true);
        if (!switchbtn) {
            let token = data.data;
            let currency = data.currency;
            let amount = data.amount;
            alert(`Token=${token} & currency=${currency} & amount ${amount}`)
        } else {
            let email = data.data;
            let currency = data.currency;
            let amount = data.amount;
            alert(`Email=${email} & currency=${currency} & amount ${amount}`)
        }
           setSpinner(false);
    }



    const toggleBtn = () => {
        setSwitchBtn(!switchbtn);
        if (switchbtn) {
            setPlaceholder("Add receiver secret token");
        } else {
            setPlaceholder("Add receiver email");
        }
    }

    const navBal = () => {
        setBalanceFlag(true);
        navigate("/sendpayment/balance");
    }
    const navPayment = () => {
        setPaymentFlag(true);
        navigate("/sendpayment/paymenthistory");
    }

    const handleExport = async () => {
        let email = window.localStorage.getItem("userEmailHP");
        pepito(email.slice(1, email.length - 1));
    }

    const menuNavigate = () => {
        navigate("/menu");
    }

    return (
        <>
            <ExamplesNavbar env="pro" />
            <Container className="cont d-flex justify-content-between">
                <Container>
                    <Container className="d-flex flex-column gap-3">
                        <Container className="bg-light text-dark rounded">
                            <h1 className="text-center pt-3">Payment Types</h1>
                            <ul>
                                <li>Public: Used to send payments by email address</li>
                                <li className="pb-3">Private: Used to send payments with secret token </li>
                            </ul>
                        </Container>
                        <Button disabled={spinner} color="info" onClick={navBal} className="p-3 btn-menu text-light">Show Balance</Button>
                        <Button disabled={spinner} color="info" onClick={navPayment} className="p-3 btn-menu text-light">Show Payment History</Button>
                        <Button disabled={spinner} color="info" onClick={handleExport} className="p-3 btn-menu text-light">Show Export payments to Excel</Button>
                        <Button disabled={spinner} color="info" onClick={menuNavigate} className="p-3 btn-menu text-light">Return to Menu</Button>
                    </Container>
                </Container>
                <div className="separator"></div>
                <Container className="d-flex flex-column align-items-center">
                    <h1 className="text-center"> Send Payment </h1>
                    <FormGroup switch className="ms-auto">
                        <Input type="switch" onChange={toggleBtn} role="switch" />
                        <Label check>{switchbtn ? "Public" : "Secret"}</Label>
                    </FormGroup>
                    <Form onSubmit={handleSubmit(fnSend)}>
                        <Controller
                            control={control}
                            name="data"
                            render={({ field: { ref, ...dataProps } }) => (
                                <FormGroup>
                                    <Label for="data"> {placeholder} </Label>
                                    <Input
                                        className="controlledInput"
                                        name="data"
                                        placeholder={placeholder}
                                        type="text"
                                        id="data"

                                        invalid={errors.data ? true : false}
                                        innerRef={ref} {...dataProps}
                                    />
                                    {errors?.data && (
                                        <FormFeedback>{errors.data?.message}</FormFeedback>
                                    )}
                                </FormGroup>
                            )}
                        />
                        <Controller
                            control={control}
                            name="amount"
                            render={({ field: { ref, ...amountProps } }) => (
                                <FormGroup>
                                    <Label for="amount"> Amount  </Label>
                                    <Input

                                        name="amount"
                                        placeholder="Put amount"
                                        type="number"
                                        id="amount"

                                        invalid={errors.amount ? true : false}
                                        innerRef={ref} {...amountProps}
                                    />


                                    {errors?.amount && (
                                        <FormFeedback>{errors.amount?.message}</FormFeedback>
                                    )}
                                </FormGroup>
                            )}
                        />

                        <Controller
                            defaultValue="usdt"
                            control={control}
                            name="currency"
                            render={({ field: { ref, ...currencyProps } }) => (
                                <FormGroup>
                                    <Label for="Currency"> Currency </Label>
                                    <Input

                                        name="currency"
                                        placeholder="Select currency"
                                        type='select'
                                        id="currency"

                                        invalid={errors.currency ? true : false}
                                        innerRef={ref} {...currencyProps}
                                    >
                                        <optgroup label="Choose a currency">
                                            {currencies?.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </optgroup>
                                    </Input>


                                    {errors?.currency && (
                                        <FormFeedback>{errors.currency?.message}</FormFeedback>
                                    )}
                                </FormGroup>
                            )}
                        />
                        <Container className="text-center">
                            {spinner ? <Button color="info" disabled={spinner} className="btn-menu text-light" type="submit"><Spinner /></Button> : <Button color="info" className="btn-menu text-light" type="submit">Send Payment</Button>}
                        </Container>
                    </Form>
                </Container>
            </Container>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/paymenthistory' element={<PaymentHistory val={{ paymentFlag, setPaymentFlag }} from="sendp" />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/balance" element={<Balance val={{ balanceFlag, setBalanceFlag }} />} />
                </Route>
            </Routes>
        </>
    )
}

export default SendPayment;