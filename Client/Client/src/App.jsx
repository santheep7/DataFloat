import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Signup = lazy(() => import("./Components/Signup"));
const Signin = lazy(() => import("./Components/Login"));
const Feedback = lazy(() => import("./Components/Feedback"));
const AdminHome = lazy(() => import("./Components/AdminHome"));
const UsersTable = lazy(() => import("./Components/UserTable"));


export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ textAlign: "center", marginTop: "2rem" }}>Loading....</div>}>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Feedback" element={<Feedback/>} />
          <Route path="/AdminHome" element={<AdminHome/>} />
          <Route path="/UserTable" element={<UsersTable/>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
