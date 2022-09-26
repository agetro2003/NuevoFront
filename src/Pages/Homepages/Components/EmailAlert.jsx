import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    Form,
    FormFeedback,
    Input,
    Label,
    FormGroup,
    Container,
    ModalFooter,
    Spinner,
    Alert,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPwSchema } from '../../../Utils/yupSchemas';
import API_AXIOS from '../../../settings/settings';
import endpointList from '../../../settings/endpoints';
import { useState } from 'react';


function EmailAlert(props) {
    const [spinner, setSpinner] = useState(false);

    const [msg, setMsg] = useState("You will receive an email to update your password");

    const [color,setColor] = useState("primary");

    const [showAlert, setShowAlert] = useState(false);

    const { valFlag, setValFlag } = props.val;

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(forgetPwSchema),
    });


    const { ref, ...emailField } = register("email");

    const fnSend = async (data) => {
        setSpinner(true);
        let { email } = data;
        let registeredFlag = await API_AXIOS.get(`${endpointList.findEmail}?email=${email}`);
        if (registeredFlag.data) {
            await API_AXIOS.post(`${endpointList.forgotPassword}?email=${email}`)
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } else {
            setMsg("Sorry, The email address is not registered in our database");
            setColor("danger");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
        setSpinner(false);
        reset();

    }

    return (
        <Modal isOpen={valFlag} size="md" className="text-dark">
            <Container className="text-black">
                <Alert className="m-2" fade isOpen={showAlert} color={color}>
                    {msg}
                </Alert>
                <ModalHeader>
                    Forgot Password
                </ModalHeader>
            </Container>
            <ModalBody>
                <Form className="text-center" onSubmit={handleSubmit(fnSend)}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { ref, ...emailField } }) => (
                            <FormGroup floating>
                                <Input
                                    bsSize="sm"
                                    name="email"
                                    placeholder="email"
                                    type="email"

                                    invalid={errors.email ? true : false}
                                    innerRef={ref} {...emailField}
                                />

                                <Label for="email"> Email </Label>
                                {errors?.email && (
                                    <FormFeedback>{errors.email?.message}</FormFeedback>
                                )}
                            </FormGroup>
                        )}
                    />
                    {spinner ? <Button mt="2em" disabled={spinner} className="btn-menu text-light" color="info" type="submit"><Spinner /></Button> : <Button mt="2em" className="btn-menu text-light" color="info" type="submit">Enviar</Button>}
                </Form>
            </ModalBody>
            <ModalFooter><Button disabled={spinner} onClick={() => setValFlag(false)} className="btn-menu text-light" color="info" >X</Button></ModalFooter>
        </Modal>
    )
}


export default EmailAlert;
