import * as Yup from "yup";

const email = Yup.string()
    .email("Invalid email!")
    .required("Required!");

const password = Yup.string()
    .required("Required!");

export const USER_REGISTRATION = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required!"),
    lastName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required!"),
    email,
    password,
    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref('password')],
            'Passwords do not match',
        )
        .required("Required!")
});

export const USER_LOGIN = Yup.object().shape({
    email,
    password,
});
