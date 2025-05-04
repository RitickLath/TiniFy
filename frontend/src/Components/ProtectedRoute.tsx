import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface IIsProtected {
  isProtected: boolean;
}

const ProtectedRoute: FC<IIsProtected> = ({ isProtected }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validate = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/validate",
          {
            headers: {
              authorization: localStorage.getItem("authToken") || "",
            },
          }
        );

        if (response.data?.status) {
          setIsAuth(true);

          // If route is NOT protected but user IS logged in, redirect to dashboard
          if (!isProtected) {
            navigate("/dashboard");
          }
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        console.warn("Auth validation failed:", error);
        setIsAuth(false);

        // If route IS protected and user is NOT logged in, redirect to login
        if (isProtected) {
          navigate("/login");
        }
      }
    };

    validate();
  }, [isProtected, navigate]);

  if (isAuth === null) return <div>Loading...</div>;

  return <Outlet />;
};

export default ProtectedRoute;

// Protected route + Not authenticated → Redirect to /login

// Unprotected route + Authenticated → Redirect to /dashboard

// All other cases → Render the route (<Outlet />)
