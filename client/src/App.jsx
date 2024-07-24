import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { NavbarDefault } from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  currentUserRequest,
  currentUserSucess,
  currentUserFailure,
} from "./Reducers/userSlice.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./api.js";
import { extractErrorMessage } from "./extractMsg.js";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const { currentuser, success } = useSelector((state) => state.user);

  const navigate = useNavigate();
  //getting the current user , to keep it log in in app
  const getCurrentUser = async () => {
    try {
      dispatch(currentUserRequest());
      const res = await axios.get("/api/v1/users/user");
      // console.log(res);
      dispatch(currentUserSucess(res.data));
    } catch (error) {
      let htmlError = extractErrorMessage(error.response?.data);
      dispatch(currentUserFailure(htmlError || error.message));
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [currentuser]);
  useEffect(() => {
    if (!success) {
      navigate("/sign-in");
    }
  }, [success, navigate]);

  return (
    <div>
      <NavbarDefault />
      <Outlet />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
