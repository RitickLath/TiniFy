import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formpageImageUrl, Formstyles } from "../constants/style";

interface FormProps {
  isSignup: boolean;
}

const Form: FC<FormProps> = ({ isSignup }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = isSignup ? { name, email, password } : { email, password };
    console.log(isSignup ? "Signing up:" : "Logging in:", payload);
  };

  return (
    <div className={Formstyles.container}>
      {/* Illustration */}
      <div className={Formstyles.illustrationWrapper}>
        <img
          src={formpageImageUrl}
          alt={isSignup ? "Signup Illustration" : "Login Illustration"}
          className="md:max-w-[650px]"
        />
      </div>

      {/* Form Section */}
      <div className={Formstyles.formWrapper}>
        <h2 className={Formstyles.heading}>
          {isSignup ? "Create Your Tinify Account" : "Welcome Back!"}
        </h2>

        {isSignup && (
          <input
            type="text"
            required
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={Formstyles.input}
          />
        )}

        <input
          type="email"
          required
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={Formstyles.input}
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={Formstyles.input}
        />

        <button onClick={handleSubmit} className={Formstyles.button}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className={Formstyles.subtitle}>
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className={Formstyles.link}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className={Formstyles.link}
              >
                Create One
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Form;
