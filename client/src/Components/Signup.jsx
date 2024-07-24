import { useState } from "react";
import { useForm } from "react-hook-form";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
} from "../Reducers/userSlice.js";
import { useDispatch } from "react-redux";
import api from "../api";
import { toast } from "react-toastify";

export function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordShown((cur) => !cur);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.set("firstName", data.firstName);
    myForm.set("lastName", data.lastName);
    myForm.set("email", data.email);
    myForm.set("password", data.password);
    myForm.set("avatar", data.avatar[0]);

    try {
      dispatch(registerUserRequest());
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await api.post("/users/signup", myForm, config);
      // console.log(res.data);
      dispatch(registerUserSuccess(res.data));
      toast.success("User Successfully Singed Up");
      navigate("/sign-in");
    } catch (error) {
      let htmlError = extractErrorMessage(error.response?.data);
      dispatch(
        registerUserFailure(htmlError || error.message)
      );
      toast.error(htmlError);
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8 mb-6">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign Up
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your details to sign up
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="firstName">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                First Name
              </Typography>
            </label>
            <Input
              id="firstName"
              color="gray"
              size="lg"
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("firstName", {
                required: "First Name is required",

                maxLength: {
                  value: 20,
                  message: "Maximum length is 20 characters",
                },
              })}
            />
          </div>
          {errors.firstName && (
            <p className="my-2 text-red-600">{errors.firstName.message}</p>
          )}

          <div className="mb-6">
            <label htmlFor="lastName">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Last Name
              </Typography>
            </label>
            <Input
              id="lastName"
              color="gray"
              size="lg"
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("lastName", {
                required: "Last Name is required",

                maxLength: {
                  value: 20,
                  message: "Maximum length is 20 characters",
                },
              })}
            />
          </div>
          {errors.lastName && (
            <p className="my-2 text-red-600">{errors.lastName.message}</p>
          )}

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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="my-2 text-red-600">{errors.email.message}</p>
          )}

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
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisibility}>
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
                  message: "Minimum length is 8 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="my-2 text-red-600">{errors.password.message}</p>
          )}
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Use at least 6 characters.
          </Typography>
          <div className="mb-6">
            <label htmlFor="confirmPassword">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Confirm Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={confirmPasswordShown ? "text" : "password"}
              icon={
                <i onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum length is 8 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Maximum length is 30 characters",
                },
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="my-2 text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Use at least 6 characters.
          </Typography>
          <div className="mb-6">
            <label htmlFor="avatar">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Avatar
              </Typography>
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full border peer border-secondarybg  shadow-sm rounded-lg text-sm focus:border-2 focus:border-secondarybg focus:border-t-transparent focus:!border-t-secondarybg focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 disabled:opacity-50 disabled:pointer-events-none  file:border-0 file:me-4 file:py-3 file:px-4  dark:file:bg-neutral-700 dark:file:text-neutral-400"
              {...register("avatar", {
                required: "Avatar image is required",
              })}
            />
            {errors.avatar && (
              <p className="my-2 text-red-600">{errors.avatar.message}</p>
            )}
          </div>

          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
          >
            Sign Up
          </Button>

          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />
            Sign up with Google
          </Button>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Already have an account?{" "}
            <Link to="/sign-in" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
