import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Login } from './api/user-management';
function LoginFrom() {

    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = sessionStorage.getItem("email");
        if (userEmail) {
            formik.setFieldValue('email', userEmail);
        }
    }, [navigate]);
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .max(20, 'Password must not exceed 20 characters')
            .matches(/[A-Z]/, 'Password must include one uppercase letter')
            .matches(/[a-z]/, 'Password must include one lowercase letter')
            .matches(/\d/, 'Password must include one number')
            .matches(/[@$!%*?&]/, 'Password must include one special character')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await Login(values);
                if (response?.status == true) {
                    toast.success(response?.message, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    if(response?.data?.token){
                        localStorage.setItem("token", response?.data?.token);
                    }

                    setTimeout(() => {
                        navigate("/admin-dashboard");
                    }, 3100);
                } else if (response?.status == false) {
                    toast.error(response?.message, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                toast.error("Error creating user. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        },
    });

    return (
        <>
            <ToastContainer />
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <h2 className="text-center">{'Login To Admin Dashboard'}</h2>
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Form.Group className='mt-2' controlId="formEmail">
                                <p className='mb-1 text-start mt-2'>Enter Email</p>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                    placeholder="Enter email"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-danger text-start">{formik.errors.email}</div>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <p className='mb-1 text-start mt-2'>Password</p>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.password && formik.errors.password}
                                    placeholder="Enter password"
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-danger text-start">{formik.errors.password}</div>
                                )}
                            </Form.Group>

                            <center>
                                <Button
                                    className='mt-3 px-5'
                                    variant="primary"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting ? 'Please Wait...' : 'Login'}
                                </Button>

                                <Button
                                    className='mt-3 px-5 ms-2'
                                    variant="warning"
                                    onClick={() => navigate("/")}
                                >
                                    Cancel
                                </Button>
                            </center>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginFrom;
