import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

function BlankLayout() {
  return (
    <Stack minHeight="100vw" justifyContent="center" alignItems="center">
      <Logo sx={{ width: 90, height: 90, mg: 5 }}></Logo>
      <Outlet></Outlet>
    </Stack>
  );
}

export default BlankLayout;
