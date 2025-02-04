import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { VerifyToken } from './api/user-management';
function AdminDashboard() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await VerifyToken(token);
                    if (response?.status === true) {
                        setUserData(response?.data);
                    } else {
                        localStorage.removeItem("token");
                        navigate('/');
                    }
                } catch (error) {
                    localStorage.removeItem("token");
                    navigate('/');
                }
            } else {
                localStorage.removeItem("token");
                navigate('/');
            }
        };

        verifyUser();
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/');
    }

    return (
        <>
            {userData && (
                <Container
                    className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
                >
                    <h1>
                        Welcome to the Admin Dashboard <strong>{`${userData?.first_name} ${userData?.last_name}`}</strong>
                    </h1>
                    <Button variant="danger" className="mt-3" onClick={logout}>
                        Logout
                    </Button>
                </Container>
            )}

        </>
    );
}

export default AdminDashboard;
