import {
    Container,
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Spinner
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import endpointList from '../../../../settings/endpoints'
import API_AXIOS from '../../../../settings/settings'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
function DepositHistory(props) {

    const [spinner,setSpinner] = useState(false);

    const { depositFlag: flag, setDepositFlag: setFlag } = props.val;

    let [userLogin, setUserLogin] = useLocalStorage('user', "");

    let [deposits, setDeposits] = useState([]);

    let [email, setEmail] = useState(window.localStorage.getItem("userEmailHP"));

    const getData = async () => {
        try {
            setSpinner(true);
            let string = "?email=" + email.slice(1, email.length - 1)
            //console.log(string)
            let { data } = await API_AXIOS.get(endpointList.getDeposits + string)
            setDeposits(data);
            setSpinner(false);
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        let date = new Date()
        setUserLogin(date)
        getData()

    }, [])
    return (
        <Modal isOpen={flag}>
        <Container className='text-center'>
            <ModalHeader className='text-dark'>
            Deposits
            </ModalHeader>
            <ModalBody>
            {spinner?<Spinner color='info'/>:
            <Table striped>
                <thead>
                    <tr>
                        <th> Amount</th>
                        <th> Currency </th>
                    </tr>
                </thead>
                <tbody>
                    {deposits &&
                        deposits.map((deposits) => (
                            <tr>
                                <td>{deposits.amount}</td>
                                <td>{deposits.currency}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            }
            </ModalBody>
            <ModalFooter>
                <Button disabled={spinner} className='btn-menu text-light' color='info' onClick={()=>setFlag(false)}>X</Button>
            </ModalFooter>
        </Container>
        </Modal>
    )
}

export default DepositHistory