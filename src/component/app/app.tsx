import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import {
    Home,
    Login,
    Register,
    ResetPassword,
    ForgotPassword,
    UserDataForm,
    Orders,
} from "../../pages";
import { ProtectedRoute } from "../protected-routes";
import AppHeader from "../app-header/app-header";
import ProfileNav from "../../pages/profile/profile-nav";
import styles from "./app.module.scss";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { getCookie } from "../../utils/cookie";
import { userFetchWithRefresh } from "../../store/user/user";
import { useDispatch, useSelector } from "react-redux";

function App() {
    const dispatch = useDispatch<any>();

    useEffect(() => {
        const options = {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: getCookie("accessToken"),
            },
            body: null,
        };

        dispatch(userFetchWithRefresh(options)).then((data: any) => {
            data.error && localStorage.setItem("isUserLogged", "false");
            data.payload?.success && localStorage.setItem("isUserLogged", "true");
        });
        // eslint-disable-next-line
    }, []);

    const ModalSwitch = () => {
        const location = useLocation();
        let background = location.state && location.state.background;

        return (
            <div className={styles.App}>
                <AppHeader />

                <Routes location={background || location}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/ingredients/:ingredientId"
                        exact
                        element={<IngredientDetails />}
                    />
                    <Route
                        path="/login"
                        element={<ProtectedRoute onlyUnAuth={false} element={<Login />} />}
                    />
                    <Route
                        path="/reset-password"
                        element={<ProtectedRoute onlyUnAuth={false} element={<ResetPassword />} />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ProtectedRoute onlyUnAuth={false} element={<ForgotPassword />} />}
                    />
                    <Route
                        path="/register"
                        element={<ProtectedRoute onlyUnAuth={false} element={<Register />} />}
                    />

                    {/* Страница только для юзеров */}

                    <Route
                        path="/profile/*"
                        element={
                            <ProtectedRoute
                                onlyUnAuth={true}
                                element={
                                    <section className={styles.profilePage}>
                                        <ProfileNav />

                                        <Routes>
                                            <Route index element={<UserDataForm />} />
                                            <Route path="/orders" element={<Orders />} />
                                        </Routes>
                                    </section>
                                }
                            />
                        }
                    />
                </Routes>

                {background && (
                    <Routes>
                        <Route
                            path="/ingredients/:ingredientId"
                            element={
                                <Modal title={"Детали ингредиента"} isRedirect={true}>
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                    </Routes>
                )}
            </div>
        );
    };

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

export default App;
