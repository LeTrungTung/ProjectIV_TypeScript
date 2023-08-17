import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../layouts/auth/Auth";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import Main from "../layouts/main/Main";
import RequiredAuth from "../components/RequireAuth";
import Admin from "../pages/AdminPage/Admin";
import ImageManage from "../components/manaImage/ImageManage";
import Admin_Detail_Layout from "../layouts/Layout_Detail/Admin_Detail_Layout";
import CrudDetail from "../components/crudDetail/CrudDetail";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />}>
        <Route path="login" index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<RequiredAuth />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route element={<RequiredAuth />}>
        <Route path="/images" element={<ImageManage />} />
      </Route>

      <Route element={<RequiredAuth />}>
        <Route
          path="/cruddetail/:id"
          element={<Admin_Detail_Layout children={<CrudDetail />} />}
        />
      </Route>

      <Route path="/" element={<Main />}></Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
