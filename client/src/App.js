import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import Dasboard from "./components/Dasboard";

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/password-reset" element={<PasswordReset/>}/>
      <Route path="/forgotpassword/:id/:token" element={<ForgotPassword/>}/>
      <Route path="/dass" element={<Dasboard/>}/>
    </Routes>
    
    </>
  );
}

export default App;
