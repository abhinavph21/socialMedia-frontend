import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button
} from "@mui/material";
import { loginUser } from '../../redux/auth/auth.action';

const validationSchema = Yup.object().shape({

    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});
const initialValues = {
    email: "",
    password: "",
};

const LoginForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();


    const handleSubmit = (values, { setSubmitting }) => {
        // Handle form submission here
        try {
            console.log(values);
            dispatch(loginUser({ data: values }))
            setTimeout(() => {
                console.log("delay");
                navigate("/")
            }, 2000)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="space-y-5">
                    <div className="space-y-5">
                        <div>
                            <Field
                                as={TextField}

                                name="email"
                                placeholder="Email"
                                type="email"
                                variant="outlined"
                                fullWidth

                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div>
                            <Field
                                as={TextField}

                                name="password"
                                placeholder="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                    </div>
                    <Button sx={{ padding: ".8rem 0rem" }} fullWidth type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </Form>
            </Formik>
            <div className="flex items-center space-x-1 mt-5 justify-center">
                <p>if you don't have account ?</p>
                <Button onClick={() => { navigate("/register") }} size="small">
                    Register
                </Button>
            </div>
            <div className="flex justify-center mt-5">
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ padding: ".8rem 0rem" }}
                >
                    Forgot Password ?
                </Button>
            </div>
        </>
    )
}

export default LoginForm