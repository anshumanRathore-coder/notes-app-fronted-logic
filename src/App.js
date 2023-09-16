import BeforeAuth from "./pages/BeforeAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userContext from "./context/userContext";
import { useContext } from "react";
import AfterAuth from "./pages/AfterAuth";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const info = useContext(userContext);
  // console.log(info);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={info.userState.isLogin ? <AfterAuth /> : <BeforeAuth />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
