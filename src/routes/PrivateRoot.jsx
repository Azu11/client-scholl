import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import DrawerTeacher from "../components/DrawerTeacher";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoot() {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Nav>
        <DrawerTeacher />
      </Nav>
      <main
        style={{ minHeight: "85vh" }}
        className="flex justify-center items-center"
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
