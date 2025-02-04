import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRegistration from './AdminRegistration';
import CustomerRegistration from './CustomerRegistration';
import VerifyOTP from './VerifyOTP';
import LoginFrom from './Login';
import Home from './home';
import AdminDashboard from './AdminDashboard';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin-registration" element={<AdminRegistration />} />
          <Route path="/customer-registration" element={<CustomerRegistration />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/login" element={<LoginFrom />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
