import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";

export default function Layout() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!isLoggedIn && !auth) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
