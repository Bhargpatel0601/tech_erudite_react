import Register from './components/common/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
function CustomerRegistration() {
  return (
      <Register
        formTitle={"Customer Registration"}
        Role={"customer"}
      />
  );
}

export default CustomerRegistration;
