import { useState , useEffect} from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleAuthBtn from "./GoogleAuthBtn";
import {
  signinUserRequest,
  signinUserSuccess,
  signinUserFailure,
} from "../Reducers/userSlice.js";
import { useDispatch , useSelector} from "react-redux";
import api from "../api";
import { toast } from "react-toastify";
import axios from "axios";
import { extractErrorMessage } from "../extractMsg.js";

export function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const success = useSelector((state) => state.user.success);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.set("email", data.email);
    myForm.set("password", data.password);
    try {
      dispatch(signinUserRequest());

      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post("/api/v1/users/signin", myForm, config);
      // console.log(res.data)
      dispatch(signinUserSuccess(res.data));
      navigate("/");
    } catch (error) {
      // console.log("err", error);
      let htmlError = extractErrorMessage(error.response?.data);
      dispatch(signinUserFailure(htmlError || error.message));
      toast.error(htmlError);
    }
  };
useEffect(()=>{
if(success){
  navigate('/')
}
}, [success, navigate])
  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="my-2 text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password cannot exceed 30 characters",
                },
              })}
            />
            {errors.password && (
              <p className="my-2 text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
          >
            Sign In
          </Button>

          <GoogleAuthBtn />
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <Link to="/sign-up" className="font-medium text-gray-900">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
