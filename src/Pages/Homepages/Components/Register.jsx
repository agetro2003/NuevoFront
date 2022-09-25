import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import API_AXIOS from "../../../settings/settings";
import { Route, Routes, useNavigate } from "react-router-dom";
import endpointList from "../../../settings/endpoints";
import { registerSchema } from "../../../Utils/yupSchemas";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  FormFeedback,
  Input,
  Form,
  Button,
  Spinner,
  Alert
} from 'reactstrap'
import { useState } from "react";
import ExamplesNavbar from "./Navbar";

function Register() {

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);

  const [spinner, setSpinner] = useState(false);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { ref, ...emailField } = register("email");

  const [color, setColor] = useState("primary");

  const fnSend = async (data) => {
    try {
      setSpinner(true);
      let registeredFlag = await API_AXIOS.get(
        endpointList.findEmail + `?email=${data.email}`
      );
      if (registeredFlag.data == 0) {
        setAlert(true);
        await API_AXIOS.post(endpointList.register + `?email=${data.email}&names=${data.firstname}&lastnames=${data.lastname}&address=${data.address}&password=${data.password}`);
        setMsg("Your account has been created. Please verify your account using the link sent to your email");
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      }
      else {
        setColor("danger");
        setMsg("This email address is associated with an existing account");
        setAlert(true);
        setTimeout(() => {
        setAlert(false);
        }, 2000);
      }
      reset();
      setSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ExamplesNavbar />
      <Container className="w-50 text-dark">
        <Card className="d-flex regcard justify-self-center">
        <Alert className="m-2" fade isOpen={alert} color={color}>
            {msg}
          </Alert>
          <CardTitle className="pt-4 d-flex">
            <h1 className="flex-fill text-center"> Register</h1>
            <Button className="text-light me-4" color="info" disabled={spinner} onClick={() => navigate("/home")}>X</Button>
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit(fnSend)}>

              <FormGroup>
                <Label for="email"> Email </Label>
                <Input id="email" placeholder="Email" type="email" invalid={errors?.email ? true : false} innerRef={ref} {...emailField} />
                {errors?.email &&
                  <FormFeedback>{errors.email?.message}</FormFeedback>}
              </FormGroup>

              <Controller
                control={control}
                name="password"
                render={({ field: { ref, ...passProps } }) => (
                  <FormGroup>
                    <Label for="password"> Password </Label>
                    <Input

                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"

                      invalid={errors.password ? true : false}
                      innerRef={ref} {...passProps}
                    />


                    {errors?.password && (
                      <FormFeedback>{errors.password?.message}</FormFeedback>
                    )}
                  </FormGroup>
                )}
              />

              <Controller
                control={control}
                name="valpass"
                render={({ field: { ref, ...valpassProps } }) => (
                  <FormGroup>
                    <Label for="valpass"> Confirm Password </Label>
                    <Input

                      name="valpass"
                      placeholder="Confirm password"
                      type="password"
                      id="valpass"

                      invalid={errors.valpass ? true : false}
                      innerRef={ref} {...valpassProps}
                    />


                    {errors?.valpass && (
                      <FormFeedback>{errors.valpass?.message}</FormFeedback>
                    )}
                  </FormGroup>
                )}
              />


              <Controller
                control={control}
                name="firstname"
                render={({ field: { ref, ...firstnameProps } }) => (
                  <FormGroup>
                    <Label for="firstname"> First Name</Label>
                    <Input

                      name="firstname"
                      placeholder="firstname"
                      type="firstname"
                      id="firstname"

                      invalid={errors.firstname ? true : false}
                      innerRef={ref} {...firstnameProps}
                    />


                    {errors?.firstname && (
                      <FormFeedback>{errors.firstname?.message}</FormFeedback>
                    )}
                  </FormGroup>
                )}
              />


              <Controller
                control={control}
                name="lastname"
                render={({ field: { ref, ...lastnameProps } }) => (
                  <FormGroup>
                    <Label for="lastname"> Last Name </Label>
                    <Input

                      name="lastname"
                      placeholder="Lastname"
                      type="lastname"
                      id="lastname"

                      invalid={errors.lastname ? true : false}
                      innerRef={ref} {...lastnameProps}
                    />


                    {errors?.lastname && (
                      <FormFeedback>{errors.lastname?.message}</FormFeedback>
                    )}
                  </FormGroup>
                )}
              />

              <Controller
                control={control}
                name="address"
                render={({ field: { ref, ...addressProps } }) => (
                  <FormGroup>
                    <Label for="address"> Address </Label>
                    <Input
                      name="address"
                      placeholder="Address"
                      type="textarea"
                      id="address"
                      invalid={errors.address ? true : false}
                      innerRef={ref} {...addressProps}
                    />


                    {errors?.address && (
                      <FormFeedback>{errors.address?.message}</FormFeedback>
                    )}
                  </FormGroup>
                )}
              />



              <Container className="text-center">
                {spinner ? <Button className="btn-menu text-light" disabled={spinner} color="info" type="submit"><Spinner /></Button> : <Button className="btn-menu text-light" color="info" type="submit">Register</Button>}
              </Container>
            </Form>
          </CardBody>
        </Card>
      </Container>

    </>
  );
}

export default Register;
