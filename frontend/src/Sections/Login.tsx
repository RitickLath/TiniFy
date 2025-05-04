import { FC } from "react";
import Form from "../Components/Form";
import Navbar from "../Components/Navbar";

const Login: FC = () => {
  return (
    <div>
      <Navbar />
      <Form isSignup={false} />
    </div>
  );
};

export default Login;
