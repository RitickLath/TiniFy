import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const styles = {
  container:
    "h-[90vh] w-full relative px-8 py-8 flex flex-col justify-center items-center",
  blurBackground: "absolute inset-0 bg-[#16181D] backdrop-blur-3xl",
  contentWrapper:
    "text-center text-white space-y-6 text-3xl md:text-5xl max-w-4xl w-full relative z-10",
  title: "font-bold tracking-wide text-gray-300 mb-3 text-3xl md:text-5xl",
  description:
    "text-lg max-w-[500px] sm:max-w-[650px] text-gray-400 mt-4 mx-auto",
  inputWrapper:
    "mt-8 w-full max-w-md md:max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4",
  input:
    "w-full flex-1 text-sm rounded-full bg-[#292C34] text-white px-6 py-4 focus:outline-none border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300",
  button:
    "bg-[#E58C33] hover:bg-[#e58c33bb] cursor-pointer text-white px-6 py-3 rounded-full shadow-lg text-sm sm:text-base mt-4 sm:mt-0 transition-all duration-300 hover:scale-105",
  footerText: "mt-6 text-sm text-gray-400",
  highlight: "text-[#E58C33] font-semibold",
  registerLink: "underline cursor-pointer text-blue-400",
};

// Animation text style
const animationStyle = {
  fontWeight: "bold",
  color: "#58a6ff",
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Blurry background */}
      <div className={styles.blurBackground}></div>

      <div className={styles.contentWrapper}>
        {/* Main Title */}
        <h1 className={styles.title}>The Ultimate Toolkit For</h1>

        {/* TypeAnimation */}
        <TypeAnimation
          sequence={[
            "URL Shortening",
            500,
            "QR Generation",
            500,
            "Visual Profile QR",
            500,
            "Smart Sharing",
            500,
            "Link Analysis",
            500,
          ]}
          style={animationStyle}
          repeat={Infinity}
        />

        {/* Description */}
        <p className={styles.description}>
          Linkly is an efficient and easy-to-use URL shortening and QR code
          generation service that streamlines your online experience. Perfect
          for simplifying links and tracking your digital content.
        </p>

        {/* Input & Button */}
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter the link here"
            className={styles.input}
          />
          <button className={styles.button}>Shorten Now!</button>
        </div>

        <p className={styles.footerText}>
          You can create <span className={styles.highlight}>05</span> more
          links.{" "}
          <span
            onClick={() => navigate("/signup")}
            className={styles.registerLink}
          >
            Register
          </span>{" "}
          now to enjoy Unlimited usage.
        </p>
      </div>
    </div>
  );
};

export default Landing;
