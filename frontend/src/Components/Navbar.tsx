import { useNavigate } from "react-router-dom";

const styles = {
  container:
    "bg-[#16181D] border-b-2 border-[#292C34] items-center flex justify-between px-8 py-4 text-white shadow-lg",
  brand: "text-3xl cursor-pointer font-bold tracking-wider text-[#334155]",
  buttonGroup: "flex space-x-2",
  button:
    "px-5 py-3 cursor-pointer hover:pb-2 rounded-full transition-all duration-300 shadow-xl text-sm sm:text-base",
};

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Logo */}
      <div onClick={() => navigate("/")} className={styles.brand}>
        Tinify
      </div>

      {/* Navigation Buttons */}
      <div className={styles.buttonGroup}>
        <button onClick={() => navigate("/login")} className={styles.button}>
          Login
        </button>
        <button onClick={() => navigate("/signup")} className={styles.button}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Navbar;
