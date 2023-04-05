import React from "react";
import { Stack, Box } from "@mui/material";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  return (
    //100vh de khi content khong du fill toan man hinh thi no van chiem 100% view height
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader></MainHeader>
      <AlertMsg></AlertMsg>
      <Outlet></Outlet>
      {/* Box nay de day footer xuong duoi cung man hinh */}
      <Box sx={{ flexGrow: 1 }}></Box>
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
