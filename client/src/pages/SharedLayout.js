import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const SharedLayout = ({ admin }) => {
    return (
        <>
            <Navbar admin={admin} />
            <Outlet />
        </>
    );
};

export default SharedLayout;
