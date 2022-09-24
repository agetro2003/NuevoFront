import {
    Container,
    Table,
    Button,
    Input,
    Form,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import endpointList from '../../../../settings/endpoints'
import API_AXIOS from '../../../../settings/settings'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useForm } from 'react-hook-form';
import { pepito } from "../../../Utils/pepito";
import * as yup from "yup";

function PaymentHistory(props) {

    const { paymentFlag: flag, setPaymentFlag: setFlag } = props.val;

    const schema = yup.object().shape({
        token: yup.string(),
    })
    const {
        register,
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
            let string = "?email=" + email.slice(1, email.length - 1)
            console.log(string)
            let { data } = await API_AXIOS.get(endpointList.getPayments + string)
            // console.log(data)
            setTransactions(data)
            setFilter(data)
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



    const fnSend = (data) => {
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
        console.log(result)
        setTransactions(result)
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
        <Modal isOpen={flag}>
            <ModalHeader className='fw-bolder text-dark'>
                Payments
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(fnSend)}>
                    <Input placeholder="Crypto filter" className="mb-4" type="text"  {...register("token")} />
                    <Input placeholder="Start date" className="mb-4" type="date"  {...register("startDate")} />
                    <Input placeholder="End date" className="mb-4" type="date"  {...register("endDate")} />
                    <Container className='text-center'>
                        <Button type="submit" className='color-primary' value="Fill data">Fill Data</Button>
                    </Container>
                </Form>
                <Table>
                    <thead>
                        <tr>
                            <th> Quantity</th>
                            <th> Currency </th>
                            <th> from/to </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions &&
                            transactions.map((transaction) => (
                                <tr>
                                    <td>{transaction.quantity}</td>
                                    <td> {transaction.token} </td>
                                    <td>{transaction.other}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Container className='text-center'>
                    <Button onClick={async () => {
                        let email = window.localStorage.getItem("userEmailHP")
                        console.log(email.slice(1, email.length - 1))
                        pepito(email.slice(1, email.length - 1))
                    }} > Export Payments' History </Button>
                </Container>
                <Button onClick={() => setFlag(false)}>X</Button>
            </ModalFooter>
        </Modal >
    )
}

export default PaymentHistory