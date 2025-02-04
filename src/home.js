import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Button
                    onClick={() => navigate("/admin-registration")}
                    variant="primary"
                    className="m-2 p-4 text-center"
                    style={{ fontSize: '1.5rem', borderRadius: '10px' }}
                >
                    Admin Registration
                </Button>
                <Button
                    onClick={() => navigate("/customer-registration")}
                    variant="secondary"
                    className="m-2 p-4 text-center"
                    style={{ fontSize: '1.5rem', borderRadius: '10px' }}
                >
                    Customer Registration
                </Button>
                <Button
                    onClick={() => navigate("/login")}
                    variant="warning"
                    className="m-2 p-4 text-center"
                    style={{ fontSize: '1.5rem', borderRadius: '10px' }}
                >
                    Login
                </Button>
            </Container>
        </>
    );
}

export default Home;
