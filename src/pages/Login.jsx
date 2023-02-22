import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { setMsg } from "../redux/msgSlice";
import ktsRequest from "../../ultis/ktsrequest";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { currentMsg } = useSelector((state) => state.msg);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (currentUser) return navigate("/dashboard");
  //   if (currentMsg) {
  //     toast.warn(currentMsg);
  //     dispatch(setMsg(null));
  //   }
  //   <ToastContainer />;
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await ktsRequest.post("/auth/signin", {
        name,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure());
      err.response
        ? toast.error(err.response.data.message)
        : toast.error("Network Error!");
      <ToastContainer />;
    }
  };
  return (
    <div className="flex h-screen items-center bg-primary bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="mx-auto flex w-full flex-col items-center justify-center px-6 py-8 md:h-screen md:w-4/6 lg:w-8/12 lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <div className="flex justify-center">
              {/* <img src={logo} className="mr-3 h-8 lg:h-16" alt="ktscorp Logo" /> */}
              <h3 className="uppercase font-bold">đăng nhập hệ thống</h3>
            </div>
            <form className="space-y-4 md:space-y-6" action="#">
              <input
                type="text"
                name="name"
                className="block w-full rounded border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                placeholder="User name"
                required="a-z"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="block w-full rounded border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                required="abc"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <button
                type="submit"
                className="w-full rounded bg-primary px-5 py-3 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
              <ToastContainer />
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Trang chủ
                </Link>
                <p className="text-sm font-light text-gray-500">
                  Chưa có tài khoản?
                  <Link
                    to="/register"
                    className="ml-2 font-medium text-primary hover:underline"
                  >
                    Đăng ký
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
