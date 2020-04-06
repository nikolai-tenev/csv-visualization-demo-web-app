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

export const DATASET_CREATE = Yup.object().shape({
    name: Yup.string()
        .required("Required!"),
    file: Yup.mixed().required("Required!")
});

export const DATASET_EDIT = Yup.object().shape({
    name: Yup.string()
        .required("Required!"),
});

export const VISUALIZATION = Yup.object().shape({
    name: Yup.string()
        .required("Required!"),
    dataset: Yup.string()
        .required("Required!"),
    showOnDashboard: Yup.bool()
        .required("Required!"),
    xAxis: Yup.string()
        .required("Required!"),
    yAxis: Yup.string()
        .required("Required!"),
});
