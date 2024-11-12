import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormStudent from "./components/FormStudent";
import ErrorPage from "./ErrorPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoot from "./routes/PrivateRoot";
import PublicRoot from "./routes/PublicRoot";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoot />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoot />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="register-student" element={<FormStudent />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
