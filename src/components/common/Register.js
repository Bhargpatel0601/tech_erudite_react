import React, { useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../../api/user-management';
import { useNavigate } from "react-router-dom";

const Register = ({ formTitle, Role }) => {
    const navigate = useNavigate();
    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        Role: Role
    };

    const validationSchema = Yup.object({
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
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
                const response = await createUser(values);
                if (response?.status == true) {
                    toast.success(response?.message, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    sessionStorage.setItem("email", values?.email);

                    setTimeout(() => {
                        navigate("/verify-otp");
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

    useEffect(() => {
        formik.setFieldValue("role", Role);
    }, []);

    return (
        <>
            <ToastContainer />
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <h2 className="text-center">{formTitle}</h2>
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Form.Group className='mt-2' controlId="formFirstname">
                                <p className='mb-1 text-start'>First Name</p>
                                <Form.Control
                                    type="text"
                                    name="first_name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.first_name && formik.errors.first_name}
                                    placeholder="Enter First Name"
                                />
                                {formik.touched.first_name && formik.errors.first_name && (
                                    <div className="text-danger text-start">{formik.errors.first_name}</div>
                                )}
                            </Form.Group>

                            <Form.Group className='mt-2' controlId="formLastname">
                                <p className='mb-1 text-start mt-2'>Last Name</p>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.last_name && formik.errors.last_name}
                                    placeholder="Enter Last Name"
                                />
                                {formik.touched.last_name && formik.errors.last_name && (
                                    <div className="text-danger text-start">{formik.errors.last_name}</div>
                                )}
                            </Form.Group>

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
                                    {formik.isSubmitting ? 'Please Wait...' : 'Register'}
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
};

export default Register;
