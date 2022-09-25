import * as yup from "yup";

let requiredMsg = "This Value is required";

let numericMsg = "This value must be a number";

let y = new Date().getFullYear();

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

const forgetPwSchema = yup.object().shape({
    email: yup.string().email().required(),
});

const registerSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    valpass: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "the password confirmation does not match"),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    address: yup.string().required(),
});

const transactionsSchema = yup.object().shape({
    email: yup.string().email().required(),
    amount: yup.number().min(0, "The amount most be possitive ").required(),
    currency: yup.string().required()
})

const sendPaymentSchema = yup.object().shape({
    data: yup.string().required(),
    currency: yup.string().required(),
    amount: yup.number().required()
})

const validatePaySchema = yup.object().shape({
    year: yup.number().typeError(numericMsg).min(2000).max(y).required(requiredMsg),
    month: yup.string().max(2).min(2).required(requiredMsg),
    day: yup.number().typeError(numericMsg).min(0).max(31).required(requiredMsg),
    hour: yup.number().typeError(numericMsg).min(0).max(24).required(requiredMsg),
    minute: yup.number().typeError(numericMsg).min(0).max(60).required(requiredMsg),
    second: yup.number().typeError(numericMsg).min(0).max(60).required(requiredMsg),
    amount: yup.number().typeError(numericMsg).required(requiredMsg)
});

export { loginSchema, registerSchema, sendPaymentSchema, validatePaySchema, transactionsSchema, forgetPwSchema }