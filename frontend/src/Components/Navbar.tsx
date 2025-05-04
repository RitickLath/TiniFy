import { useNavigate } from "react-router-dom";
import { Navbarstyles } from "../constants/style";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={Navbarstyles.container}>
      {/* Logo */}
      <div onClick={() => navigate("/")} className={Navbarstyles.brand}>
        Tinify
      </div>

      {/* Navigation Buttons */}
      <div className={Navbarstyles.buttonGroup}>
        <button
          onClick={() => navigate("/login")}
          className={Navbarstyles.button}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className={Navbarstyles.button}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Navbar;
