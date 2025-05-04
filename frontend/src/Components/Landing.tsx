import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { Landingstyles } from "../constants/style";

// Animation text style
const animationStyle = {
  fontWeight: "bold",
  color: "#58a6ff",
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={Landingstyles.container}>
      {/* Blurry background */}
      <div className={Landingstyles.blurBackground}></div>

      <div className={Landingstyles.contentWrapper}>
        {/* Main Title */}
        <h1 className={Landingstyles.title}>The Ultimate Toolkit For</h1>

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
        <p className={Landingstyles.description}>
          Linkly is an efficient and easy-to-use URL shortening and QR code
          generation service that streamlines your online experience. Perfect
          for simplifying links and tracking your digital content.
        </p>

        {/* Input & Button */}
        <div className={Landingstyles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter the link here"
            className={Landingstyles.input}
          />
          <button className={Landingstyles.button}>Shorten Now!</button>
        </div>

        <p className={Landingstyles.footerText}>
          You can create <span className={Landingstyles.highlight}>05</span>{" "}
          more links.{" "}
          <span
            onClick={() => navigate("/signup")}
            className={Landingstyles.registerLink}
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
