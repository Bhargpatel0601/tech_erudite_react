import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { verifyOTP } from './api/user-management';
function VerifyOTP() {

    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = sessionStorage.getItem("email");
        formik.setFieldValue('email', userEmail);
        if (!userEmail) {
            navigate("/");
        }
    }, [navigate]);
    const initialValues = {
        email: '',
        otp: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        otp: Yup.string()
            .required('OTP is required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await verifyOTP(values);
                if (response?.status == true) {
                    toast.success(response?.message, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    sessionStorage.removeItem("email");
                    setTimeout(() => {
                        navigate("/login");
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
                        <h2 className="text-center">{'Check Your Mail & Enter OTP.'}</h2>
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Form.Group className='mt-2' controlId="formEmail">
                                <p className='mb-1 text-start mt-2'>Enter Email</p>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled
                                    isInvalid={formik.touched.email && formik.errors.email}
                                    placeholder="Enter email"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-danger text-start">{formik.errors.email}</div>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formOTP">
                                <p className='mb-1 text-start mt-2'>Enter Your OTP</p>
                                <Form.Control
                                    type="number"
                                    name="otp"
                                    value={formik.values.otp}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.otp && formik.errors.otp}
                                    placeholder="Enter otp"
                                />
                                {formik.touched.otp && formik.errors.otp && (
                                    <div className="text-danger text-start">{formik.errors.otp}</div>
                                )}
                            </Form.Group>

                            <center>
                                <Button
                                    className='mt-3 px-5'
                                    variant="primary"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting ? 'Please Wait...' : 'Verify OTP & Register'}
                                </Button>
                            </center>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default VerifyOTP;
