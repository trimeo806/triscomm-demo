import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import UserProfilePage from "../pages/UserProfilePage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />}></Route>
        <Route path="account" element={<AccountPage></AccountPage>}></Route>
        <Route
          path="/user/:userId"
          element={<UserProfilePage></UserProfilePage>}
        ></Route>
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
}

export default Router;
