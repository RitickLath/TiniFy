import Form from "../Components/Form";
import Navbar from "../Components/Navbar";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <Form isSignup={true} />
    </div>
  );
};

export default Signup;
