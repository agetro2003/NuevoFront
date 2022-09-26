import {
    Modal,
    Container,
    Form,
    FormGroup,
    Label,
    FormFeedback,
    Input,
    ModalHeader,
    ModalBody,
    Button,
    Spinner,
    ModalFooter
} from "reactstrap"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { transactionsSchema } from "../../Utils/yupSchemas"
import endpointList from "../../../settings/endpoints"
import API_AXIOS from "../../../settings/settings"
import { useLocalStorage } from "../../hooks/useLocalStorage"


const currencies = ["usdt", "btc", "eth", "busd"]


function Transactions(props) {

    let [userLogin, setUserLogin] = useLocalStorage('user', "")
    const [spinner, setSpinner] = useState(false);
    const { transFlag, setTransFlag } = props.val;

    let [userEmail, setEmail] = useState(window.localStorage.getItem("userEmailHP"))
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(transactionsSchema),
    });
    useEffect(() => {
        let date = new Date()
        setUserLogin(date)
    }, [])

    const fnSend = async (data) => {
        try {
            setSpinner(true);
            let string = `?sender=${userEmail.slice(1, userEmail.length - 1)}&receiver=${data.email}&quantity=${data.amount}&token=${data.currency}`
            let output = await API_AXIOS.post(endpointList.sendPayment + string)
            alert(output.data)
            switch (output.data) {
                case 0:
                    alert("no existe el sender")
                    break;
                case 1:
                    alert("No tienes tanta plata")
                    break;
                case 2:
                    alert("Sender = receiver")
                    break
                case 3:
                    alert("Salio bien")
                    break;
                default:
                    alert("error")
                    break;
            }
            setSpinner(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal className="text-dark" isOpen={transFlag}>
            <ModalHeader className="d-flex justify-content-around">
                Transactions
            </ModalHeader>
            <ModalBody>
                <h4>From:{userEmail}</h4>
                <Form onSubmit={handleSubmit(fnSend)}>
                    <FormGroup>
                        <Label> Email of receiver</Label>
                        <Input type='email' id="email" placeholder="Email" {...register("email")} />
                        <FormFeedback> {errors.email?.message} </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label> Currency </Label>
                        <Input type="select" placeholder="select" {...register("currency")}>
                            {currencies?.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Input>
                        <FormFeedback> {errors.currency?.message} </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label> Amount of the selected currency </Label>
                        <Input type="number" id="amount" placeholder="Amount" {...register("amount")} />
                        <FormFeedback> {errors.amount?.message} </FormFeedback>
                    </FormGroup>
                    <Container className="text-center">
                        {spinner ? <Button disabled={spinner}><Spinner /></Button> : <Button type='submit'>Confirm Transaction</Button>}
                    </Container>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => setTransFlag(false)}>X</Button>
            </ModalFooter>
        </Modal>
    )

}

export default Transactions