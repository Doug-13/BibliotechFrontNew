import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Importações das pages
import Login from "../pages/login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import FollowerProfile from "../pages/FollowerProfile";
import Community from "../pages/Community";
import AddBook from "../pages/AddBooks";
import Share from "../pages/Share";
import PersonalLibrary from "../pages/PersonalLibrary";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DecorativeBar from "../components/Perfumaria";
import Register from "../pages/Register";
import { AuthProvider } from "../authentication/Authentication";
import UserProfile from "../pages/UserProfile";

function Router() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Register />} path="/Registro" exact />
                    <Route element={<Home />} path="/Home" exact />
                    <Route element={<Login />} path="/" exact />
                    <Route element={<Profile />} path="/Profile" exact />
                    <Route element={<UserProfile />} path="/userProfile" exact />
                    <Route element={<FollowerProfile />} path="/follower/:id" exact />
                    <Route element={<PersonalLibrary />} path="/personal-library" exact />
                    <Route element={<Share />} path="/share" exact />
                    <Route element={<Community />} path="/Community" exact />
                    <Route element={<AddBook />} path="/pages/AddBook" exact />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Router;
