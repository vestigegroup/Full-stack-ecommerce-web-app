import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/nav/Header";
import Home from "./Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                currentUser(idTokenResult.token).then((res) => {
                    const { name, email, role, _id } = res.data;
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name,
                            email,
                            role,
                            _id,
                            token: idTokenResult.token,
                        },
                    });
                });
            }
        });
        return () => unsubscribe;
    }, []);
    return (
        <>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/register/complete"
                    element={<RegisterComplete />}
                />
                <Route path="/forgot/password" element={<ForgotPassword />} />
            </Routes>
        </>
    );
};

export default App;
