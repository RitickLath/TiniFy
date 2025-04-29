import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container:
    "min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4",
  title: "text-4xl font-bold mb-4",
  message: "text-lg mb-2",
  subMessage: "text-sm text-gray-400",
  link: "underline cursor-pointer",
};

const NotFound: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        You’ll be redirected to the homepage shortly.
      </p>
      <p className={styles.subMessage}>
        If nothing happens, click{" "}
        <span className={styles.link} onClick={() => navigate("/")}>
          here
        </span>
        .
      </p>
    </div>
  );
};

export default NotFound;
