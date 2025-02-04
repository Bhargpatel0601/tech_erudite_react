import Register from './components/common/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
function AdminRegistration() {
  return (
      <Register
        formTitle={"Admin Registration"}
        Role={"admin"}
      />
  );
}

export default AdminRegistration;
