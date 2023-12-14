import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import SideBar from "./../SideBar/SideBar";

export default function MasterLayout({ userData }) {
  return (
    <>
      <div>
        <div className="d-flex">
          <div className="side-bg side">
          <SideBar />
          </div>
          <div className="w-100">
            <div className="container-fluid">
            <Navbar userData={userData} />
            <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
