import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formpageImageUrl, Formstyles } from "../constants/style";
import { handleSignin, handleSignup } from "../utils/handler";

interface FormProps {
  isSignup: boolean;
}

const Form: FC<FormProps> = ({ isSignup }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleCall = async () => {
    setMessage(null);
    setIsError(false);

    const response = isSignup
      ? await handleSignup(name, email, password)
      : await handleSignin(email, password);

    if (response?.status) {
      setMessage(isSignup ? "Registered successfully!" : "Login successful!");
      setIsError(false);

      setTimeout(() => {
        navigate(isSignup ? "/signin" : "/dashboard");
      }, 2000);
    } else {
      setMessage(response?.message || "Something went wrong.");
      setIsError(true);
    }
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

        <button onClick={handleCall} className={Formstyles.button}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {/* Message Box */}
        {message && (
          <p
            className={`text-sm text-center mt-2 ${
              isError ? "text-red-400" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}

        {/* Redirect Link */}
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
