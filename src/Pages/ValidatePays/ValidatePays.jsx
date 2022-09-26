import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validatePaySchema } from "../../Utils/yupSchemas";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  FormFeedback,
  Input,
  Button,
  Spinner,
  Container,
  ModalFooter,
} from 'reactstrap'
import { useEffect, useState } from "react";
import API_AXIOS from "../../../settings/settings";
import endpointList from "../../../settings/endpoints";
import { useLocalStorage } from "../../hooks/useLocalStorage";



function ValidatePays(props) {
  let [userEmail, setEmail] = useState(window.localStorage.getItem("userEmailHP"));
  let [userLogin, setUserLogin] = useLocalStorage('user', "")
  const [spinner, setSpinner] = useState(false);

  let { valFlag, setValFlag } = props.val;

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validatePaySchema),
  });

  const fnSend = async (data) => {
    try {
      setSpinner(true);
      let string = `?email=${userEmail.slice(1, userEmail.length - 1)}&year=${data.year}&month=${data.month}&day=${data.day}&hours=${data.hour}&minutes=${data.minute}&seconds=${data.second}&quantity=${data.quantity}`
      let output = await API_AXIOS.post(endpointList.verifyPayment + string)
      alert(JSON.stringify(output.data))
      setSpinner(false);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let date = new Date()
    setUserLogin(date)
  }, [])
  return (
    <Modal className="text-dark" isOpen={valFlag} size="lg">
      <ModalHeader className="d-flex justify-content-evenly">
        Validate payment
      </ModalHeader>

      <ModalBody>
        <Form onSubmit={handleSubmit(fnSend)}>
          <Controller
            control={control}
            name="year"
            render={({ field: { ref, ...yearProps } }) => (
              <FormGroup>
                <Label for="year"> Year </Label>
                <Input

                  name="year"
                  placeholder="Year"
                  type="number"
                  id="year"

                  invalid={errors.year ? true : false}
                  innerRef={ref} {...yearProps}
                />
                {errors?.year && (
                  <FormFeedback>{errors.year?.message}</FormFeedback>
                )}
              </FormGroup>
            )}
          />
          <Controller
            control={control}
            name="month"
            render={({ field: { ref, ...monthProps } }) => (
              <FormGroup>
                <Label for="month"> Month </Label>
                <Input

                  name="month"
                  placeholder="Month"
                  type="number"
                  id="month"

                  invalid={errors.month ? true : false}
                  innerRef={ref} {...monthProps}
                />
                {errors?.month && (
                  <FormFeedback>{errors.month?.message}</FormFeedback>
                )}
              </FormGroup>
            )}
          />
          <Controller
            control={control}
            name="day"
            render={({ field: { ref, ...dayProps } }) => (
              <FormGroup>
                <Label for="day"> Day </Label>
                <Input

                  name="day"
                  placeholder="Day"
                  type="number"
                  id="day"

                  invalid={errors.day ? true : false}
                  innerRef={ref} {...dayProps}
                />
                {errors?.day && (
                  <FormFeedback>{errors.day?.message}</FormFeedback>
                )}
              </FormGroup>
            )}
          />
          <Controller
            control={control}
            name="hour"
            render={({ field: { ref, ...hourProps } }) => (
              <FormGroup>
                <Label for="hour"> Hour </Label>
                <Input

                  name="hour"
                  placeholder="Hour"
                  type="number"
                  id="hour"

                  invalid={errors.hour ? true : false}
                  innerRef={ref} {...hourProps}
                />
                {errors?.hour && (
                  <FormFeedback>{errors.hour?.message}</FormFeedback>
                )}
              </FormGroup>
            )}
          />
          <Controller
            control={control}
            name="minute"
            render={({ field: { ref, ...minuteProps } }) => (
              <FormGroup>
                <Label for="minute"> Minutes </Label>
                <Input

                  name="minute"
                  placeholder="Minutes"
                  type="number"
                  id="minute"

                  invalid={errors.minute ? true : false}
                  innerRef={ref} {...minuteProps}
                />
                {errors?.minute && (
                  <FormFeedback>{errors.minute?.message}</FormFeedback>
                )}
              </FormGroup>
            )}
          />
          <Controller
            control={control}
            name="second"
            render={({ field: { ref, ...secondProps } }) => (
              <FormGroup>
                <Label for="second"> Seconds </Label>
                <Input

                  name="second"
                  placeholder="Seconds"
                  type="number"
                  id="second"

                  invalid={errors.second ? true : false}
                  innerRef={ref} {...secondProps}
                />
                {errors?.second && (
                  <FormFeedback>{errors.second?.message}</FormFeedback>
                )}
              </FormGroup>
            )}
          />
          <Controller
            control={control}
            name="amount"
            render={({ field: { ref, ...amountProps } }) => (
              <FormGroup>
                <Label for="amount"> Amount </Label>
                <Input

                  name="amount"
                  placeholder="Amount"
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
          <Container className="text-center">
            {spinner ? <Button disabled={spinner} type="submit" className="btn-menu text-light" color="info" value="register"><Spinner /></Button> : <Button type="submit" className="text-center btn-menu text-light" color="info" value="register">Validate</Button>}
          </Container>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button disabled={spinner} className="btn-menu text-light" color="info" onClick={() => setValFlag(false)}>X</Button>
      </ModalFooter>
    </Modal>
  )

}

export default ValidatePays;