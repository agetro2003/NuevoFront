import {
    Container,
    Table,
    Button,
    Input,
    Form,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    FormFeedback,
    Spinner
} from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import endpointList from '../../../../settings/endpoints'
import API_AXIOS from '../../../../settings/settings'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Controller, useForm } from 'react-hook-form';
import { pepito } from "../../../Utils/pepito";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    token: yup.string(),
})
function PaymentHistory(props) {

    const [spinner, setSpinner] = useState(false);

    const currencies = ["usdt", "btc", "eth", "busd"];

    const { paymentFlag: flag, setPaymentFlag: setFlag } = props.val;

    const { from } = props;

    const navigate = useNavigate();

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    let trans = [
        { quantity: 500, other: 'foo@foo.foo', token: "btc", date: 1647057600000 },
        { quantity: -300, other: 'bar@bar.bar', token: "usdt", date: 1632542400000 },
        { quantity: 200, other: 'qux@qux.qux', token: "eth", date: 1648180800000 }
    ]


    let [newTrans, setNewTrans] = useState([])
    let [filter, setFilter] = useState([])
    //  let [busqueda, setBusqueda] = useState("")
    let [transactions, setTransactions] = useState([])
    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"))
    let [userLogin, setUserLogin] = useLocalStorage('user', "")

    const getData = async () => {
        try {
            setSpinner(true);
            let string = "?email=" + email.slice(1, email.length - 1)
            console.log(string)
            let { data } = await API_AXIOS.get(endpointList.getPayments + string)
            // console.log(data)
            setTransactions(data);
            setFilter(data);
            setSpinner(false);
        } catch (error) {
            console.log(error)
        }

    }

    /*
    const fillFunc = (dataBusqueda) => {
        var result 
        result = filter.filter((element) => {
            if(element.token.toString().toLowerCase().includes(dataBusqueda.toLowerCase())){
                return element;
            }  
        })
        setTransactions(result)
    }
 

    const handleChangeCrypto = e => {
        setBusqueda(e.target.value)
        fillFunc(e.target.value)
    }*/

    const handleClose = () => {
        setFlag(false);
        if (from == "profile") {
            navigate("/profile");
        }else{
            navigate("/sendpayment");
        }
    }

    const fnSend = (data) => {
        setSpinner(true);
        let start = new Date(data.startDate)
        let end = new Date(data.endDate)
        var result = filter.filter((element) => {
            if (element.token.toString().toLowerCase().includes(data.token.toLowerCase())
                && (start.getTime() <= element.date || data.startDate == "")
                && (end.getTime() >= element.date || data.endDate == "")
            ) {
                return element
            }
        }
        )
        setTransactions(result);
        setSpinner(false);
    }

    useEffect(() => {
        let date = new Date()
        setUserLogin(date)
        getData()
        //  console.log(transactions)
    }, [])


    useEffect(() => {
        let array = []
        for (let i = 0; i < transactions.length; i++) {
            let d = new Date(transactions[i].date)
            let stringdate = [
                d.getDate().toString().padStart(2, '0'),
                (d.getMonth() + 1).toString().padStart(2, '0'),
                d.getFullYear()
            ].join('/')
            let o = {
                quantity: transactions[i].quantity,
                other: transactions[i].other,
                token: transactions[i].token,
                date: stringdate
            }

            array.push(o)
        }

        setNewTrans(array)
        // console.log(array)
    }, [transactions])
    return (
        <Modal isOpen={flag} className="text-dark">
            <ModalHeader className='fw-bolder text-dark'>
                Payments
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(fnSend)}>
                    <FormGroup>
                        <Controller
                            defaultValue=""
                            control={control}
                            name="token"
                            render={({ field: { ref, ...tokenProp } }) => (
                                <FormGroup floating>
                                    <Input
                                        disabled={spinner}
                                        name="token"
                                        placeholder="Select token"
                                        type='text'
                                        id="token"

                                        invalid={errors.token ? true : false}
                                        innerRef={ref} {...tokenProp}
                                    >
                                    </Input>
                                    <Label for="token"> Token </Label>
                                    {errors?.currency && (
                                        <FormFeedback>{errors.currency?.message}</FormFeedback>
                                    )}
                                </FormGroup>
                            )}
                        />
                    </FormGroup>
                    <Controller
                        control={control}
                        name="startDate"
                        defaultValue=""
                        render={({ field: { ref, ...startDateProp } }) => (
                            <FormGroup floating>
                                <Input
                                    disabled={spinner}
                                    className="mb-4"
                                    name="startDate"
                                    placeholder="startDate"
                                    type="date"
                                    invalid={errors.startDate ? true : false}
                                    innerRef={ref} {...startDateProp}
                                />
                                <Label for="startDate"> Start Date </Label>
                                {errors?.startDate && (
                                    <FormFeedback>{errors.startDate?.message}</FormFeedback>
                                )}

                            </FormGroup>
                        )}
                    />
                    <Controller
                        control={control}
                        name="endDate"
                        defaultValue=""
                        render={({ field: { ref, ...endDateProp } }) => (
                            <FormGroup floating>
                                <Input
                                    disabled={spinner}
                                    className="mb-4"
                                    name="endDate"
                                    placeholder="endDate"
                                    type="date"
                                    invalid={errors.endDate ? true : false}
                                    innerRef={ref} {...endDateProp}
                                />
                                <Label for="endDate"> End Date </Label>
                                {errors?.endDate && (
                                    <FormFeedback>{errors.endDate?.message}</FormFeedback>
                                )}

                            </FormGroup>
                        )}
                    />
                    {/* <Input placeholder="Crypto filter" className="mb-4" type="text"  {...register("token")} />
                    <Input placeholder="Start date" className="mb-4" type="date"  {...register("startDate")} />
                    <Input placeholder="End date" className="mb-4" type="date"  {...register("endDate")} />*/}
                    <Container className='text-center'>
                        {spinner ? <Button disabled={spinner} type="submit" color="info" className="btn-menu text-light" value="Fill data"><Spinner /></Button> : <Button type="submit" color="info" className="btn-menu text-light" value="Fill data">Filter Data</Button>}
                    </Container>
                </Form>
                <Table>
                    <thead>
                        <tr>
                            <th> Quantity</th>
                            <th> Currency </th>
                            <th> from/to </th>
                            <th> Date </th>
                        </tr>
                    </thead>
                    <tbody>
                        {newTrans &&
                            newTrans.map((transaction) => (
                                <tr>
                                    <td>{transaction.quantity}</td>
                                    <td> {transaction.token} </td>
                                    <td>{transaction.other}</td>
                                    <td> {transaction.date}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button disabled={spinner} className="btn-menu text-light" color='info' onClick={handleClose}>X</Button>
            </ModalFooter>
        </Modal >
    )
}

export default PaymentHistory